# Echelon - Money in the Bank

This project was created for the 75th Rangers Regiment as a tool to be used to upload and visualize various budgeting data. While this is the oringal intent the project was built in a way to allow any data to be uploaded, visualized and stored in user created dashboard pages provided that the data format is either .xlsx, .csv or .json. Users import their data into the product, select which variables they want to visualize as well as how the want to visualize the data. The data visualizations are currently Bar charts, Line charts and Pie charts. Login capapilities have also been added but they are currently disabled.



## Getting Started

Get started by installing the client and the server...

1. Clone this git repo using the ```git clone``` command
2. ```cd``` into the repo

**Optional but advised:** Create a virtual environment within your local setup where you will install any packages needed for the front or back end of this project

### Client
3. run ```install npm ``` to have access to various React features as well as any packages needed for this repo
4. run ```npm start ``` to initiate your front end server

### Server

5. Open second terminal window
6. run ``` pip install server/requirements.txt``` to install any back end packages
7. run ```flask run``` to initiate your backend server


## Documentation

### Echelon and beyond
Below are various features that either have not been created or features that need to be refactored if needed:
- Refactor to allow for multiple data files to uploaded at once
- Add additional data visualization options if needed (see documentation for Chart.js [here](https://www.chartjs.org/docs/latest/))
- Complete user ability to update and customize dashboards (this is currently hardcoded to only include Overview, Travel, Accounting, Reports, Integrations) 
- Integrate this tool into DoD internal systems
- Automate data ingestion from original data sources via a data pipeline (either batch or realtime processing) and a scheduling workflow (i.e. [Airflow](https://airflow.apache.org/))
- Consider builing out a Relational Database or Non-Relational Database if creating an automatic pipeline for this tool

## Contributors

Echelon is created by the Kosher Kiwis, with members as following:

- Alexandra Plassaras
- Devon Pirestani
- Gideon Tong
