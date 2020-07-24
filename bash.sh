#!/bin/bash

cd bms

echo "============================================================="
echo "-- Creating Virtual Environment and Installing Dependencies"
echo "============================================================="

cp credentials.yaml.example credentials.yaml

virtualenv venv
source venv/bin/activate
pip install -r requirements.txt

python helper/migrations.py

echo "================================================"
echo "-- Installing React Dependencies"
echo "================================================"


cd ../frontend/bms-frontend
yarn install

echo "========================== Installation completed. =========================="