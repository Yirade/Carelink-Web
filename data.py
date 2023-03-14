import carelink_client

import json

# Read the configuration file
with open("config.txt") as f:
    for line in f:
        line = line.strip()
        if line.startswith("user_name="):
            user_name = line.split("=")[1]
        elif line.startswith("user_password="):
            user_password = line.split("=")[1]
        elif line.startswith("user_country="):
            user_country = line.split("=")[1]
        elif line.startswith("port_number="):
            port_number = line.split("=")[1]

while True:
    # Create a CareLink client object
    client = carelink_client.CareLinkClient(user_name, user_password, user_country)
    
    # Attempt to login to CareLink
    if client.login():
        # Get the recent data from CareLink
        recent_data = client.getRecentData()
        
        # Check if there is any data available
        if recent_data is not None:
            # Get the last SG value and all SG values
            last_sg = recent_data['lastSG']
            sgs = recent_data['sgs']

            # Create an empty list for the chart values
            chart_values = []

            # Iterate through the SG values in reverse order
            for i in range(-1, -len(sgs) - 1, -1):
                # Add the SG value to the chart values list
                chart_values.append(sgs[i]['sg'])
                # If the list already has 35 elements, stop the loop
                if len(chart_values) == 37:
                    break

            # Replace all 0 values in the chart values list with None
            for i in range(len(chart_values)):
                if chart_values[i] == 0:
                    chart_values[i] = None

            # Find the first non-null value in the chart values list
            for value in chart_values:
                if value is not None:
                    last_non_null_value = value
                    break

            # Create a dictionary with the relevant data
            data_dict = {
                "name": recent_data["firstName"],
                "sg": last_sg["sg"],
                "trend": recent_data["lastSGTrend"],
                "calibration": recent_data["timeToNextCalibHours"],
                "sensorlife": recent_data["sensorDurationHours"],
                "battery": recent_data["medicalDeviceBatteryLevelPercent"],
                "state": recent_data["sensorState"],
                "last": last_non_null_value,
                "values": list(reversed(chart_values))
            }

            # Convert the dictionary to a JSON object and print it
            json_object = json.dumps(data_dict, indent=9)
            #print(json_object)
            
            # Write the JSON object to a file
            with open("data.json", "w") as outfile:
                outfile.write(json_object)
        else:
            print("No data")