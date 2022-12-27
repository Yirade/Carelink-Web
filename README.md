
# :rocket: Carelink Web

A simple web app that helps users keep track of their glucose levels and medical device information.




## :gear: Features

- Display current time, battery level, and sensor duration of the user's medical device
- Show the user's last recorded glucose level and its trend
- Provide a notification when the device needs calibration or if there are any issues with the sensor
- Allow the user to enter their name and receive a personalized greeting



## :computer: Tech Stack

This website is built using HTML, CSS, and JavaScript. It uses [Bootstrap](https://getbootstrap.com/) for the layout and [Bootstrap Icons](https://icons.getbootstrap.com/) for the icons. The app retrieves data from the user's medical device using [carelink-python-client](https://github.com/ondrej1024/carelink-python-client) by ondrej1024.


## :information_source: How to Use

- Clone this repository and install the dependencies:
```
git clone https://github.com/Yirade/Carelink-Web
```
- Replace the placeholder values in "data.py" with your own device information:
```
# Enter your login credentials
USERNAME = "Enter your username here"
PASSWORD = "Enter your password here"
COUNTRY = "Enter your country here"
```
- Run the script:
```
python3 data.py
```


## :handshake: Contributions

Feel free to fork this repository and add your own features or improvements. Don't forget to create a pull request for your changes to be reviewed and merged.


## :scroll: License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/Yirade/Carelink-Web/blob/main/LICENSE) file for details.


## :clap: Credits
This project uses the "carelink-python-client" library by ondrej1024. The original library can be found [here](https://github.com/ondrej1024/carelink-python-client).
