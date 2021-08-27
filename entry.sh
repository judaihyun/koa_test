#!/bin/sh
pwd
ls -l
sequelize-cli db:migrate
sequelize-cli db:seed:all