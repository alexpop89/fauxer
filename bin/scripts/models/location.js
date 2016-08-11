const DatabaseConnector = require('./utils/database-connector');
const BaseClass = require('./core/base-class');

const config = require('../../../config');

class LocationClass extends BaseClass {
    constructor({id, city, country_code, country_name, ip, latitude, longitude, metro_code, region_name, region_code, time_zone, zip_code, projectId}) {
        super();

        this.id = id || 0;
        this.city = city;
        this.countryCode = country_code;
        this.countryName = country_name;
        this.ipAddress = ip;
        this.latitude = latitude;
        this.longitude = longitude;
        this.metroCode = metro_code;
        this.regionCode = region_code;
        this.regionName = region_name;
        this.timeZone = time_zone;
        this.zipCode = zip_code;
        this.project = projectId;
    }

    fetchData() {
        return DatabaseConnector.find(config.DATABASE_TABLES.LOCATIONS, ['*'], {id: this.id}).then(response => {
            Object.assign(this, response[0]);
            return this;
        });
    }

    save() {
        var locationData = this.serialize();
        locationData._matchAll = true;
        delete locationData.id;

        return DatabaseConnector.find(config.DATABASE_TABLES.LOCATIONS, ['*'], locationData).then(rows => {
            if (rows && rows[0]) {
                this.id = parseInt(rows[0].id, 10);
                return DatabaseConnector.update(config.DATABASE_TABLES.LOCATIONS, this.serialize(), {id: this.id});
            } else {
                delete this['id'];
                return DatabaseConnector.insert(config.DATABASE_TABLES.LOCATIONS, this.serialize()).then(response => {
                    this.id = response.insertId;
                });
            }
        });
    }
}

module.exports = LocationClass;