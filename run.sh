#!/bin/bash

# Check if config.txt exists, if not prompt user to create one
if [[ ! -f config.txt ]]; then
    read -p "Configuration file not found. Do you want to create one now? (y/n) " create_file

    if [[ $create_file == "y" ]]; then
        read -p "Enter user name: " user_name
        read -p "Enter user password: " user_password
        read -p "Enter user country: " user_country
        read -p "Enter port number (default is 8000): " port_number

        # Write configuration data to config.txt
        echo "# User name" > config.txt
        echo "user_name=$user_name" >> config.txt
        echo "" >> config.txt
        echo "# User password" >> config.txt
        echo "user_password=$user_password" >> config.txt
        echo "" >> config.txt
        echo "# Country" >> config.txt
        echo "user_country=$user_country" >> config.txt
        echo "" >> config.txt
        echo "# Port number" >> config.txt

        # Check if port_number is empty, set to default if so
        if [[ -z $port_number ]]; then
            echo "port_number=8000" >> config.txt
        else
            echo "port_number=$port_number" >> config.txt
        fi

    else
        echo "Cannot start server without configuration file. Exiting."
        exit 1
    fi
fi

# Read configuration data from config.txt
source config.txt

# Check if dependencies are already installed
echo "Checking for required dependencies..."
echo ""

if [[ ! -x "$(command -v pip)" ]]; then
    echo "PIP is not installed, installing..."
    sudo apt-get install python3-pip -y
fi

if [[ ! -x "$(command -v json)" ]]; then
    echo "The json package is not installed, installing..."
    pip install json
fi

if [[ ! -x "$(command -v http.server)" ]]; then
    echo "The http.server package is not installed, installing..."
    pip install http.server
fi

if [[ ! -x "$(command -v socketserver)" ]]; then
    echo "The socketserver package is not installed, installing..."
    pip install socketserver
fi

if [[ ! -x "$(command -v requests)" ]]; then
    echo "The requests package is not installed, installing..."
    pip install requests
fi

if [[ ! -x "$(command -v datetime)" ]]; then
    echo "The datetime package is not installed, installing..."
    pip install datetime
fi

# Kill processes running on port $port_number
echo "Killing processes running on port $port_number..."
kill $(lsof -t -i:$port_number)
sleep 2

# Start the server
echo "Starting the server..."
python3 server.py &
SERVER_PID=$!

# Start the data management file
echo "Starting the data management file..."
python3 data.py &
DATA_PID=$!

# Check if GUI is available
if [[ ! -z "$DISPLAY" ]]; then
    echo "Opening index.html in a browser..."
    xdg-open "http://localhost:$port_number/index.html"
else
    echo "GUI is not available, open index.html in a browser to view the web interface."
fi

# Check the status of the servers and their availability
stty -echo
while true
do
    SERVER_STATUS=$(ps -p $SERVER_PID -o comm=)
    DATA_STATUS=$(ps -p $DATA_PID -o comm=)
    HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$port_number/index.html)

    clear
    echo -e "\033[0m\033[1mServer status:"
    echo -e "\033[0mServer.py: \033[32m$SERVER_STATUS"
    echo -e "\033[0mData.py: \033[32m$DATA_STATUS"
    echo -e "\033[0m"
    echo "Availability on port $port_number:"
    if [ $HTTP_STATUS -eq 200 ]
    then
        echo -e "index.html: \033[32mWorking\033[0m\n"
    else
        echo -e "index.html: \033[31mNot working\033[0m\n"
    fi

    # Check if 'q' key has been pressed to exit the server
    
    read -t 1 -n 1 input
    if [[ $input = "q" ]]
    then
        stty echo
        break
    fi

    sleep 1
    
done

# Terminate the server and data management file processes
echo -e "\nTerminating the server and data management file processes..."
kill $SERVER_PID $DATA_PID $(lsof -t -i:$port_number)

echo "Exiting the server."
