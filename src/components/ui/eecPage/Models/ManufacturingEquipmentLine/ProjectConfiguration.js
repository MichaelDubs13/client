export default class ProjectConfiguration {
    static plant
    static shop
    static line 
    static installation_location

    static set(config){
        ProjectConfiguration.plant = config.plant;
        ProjectConfiguration.shop = config.shop;
        ProjectConfiguration.line = config.line;
        ProjectConfiguration.installation_location = config.installation_location;
    }
}