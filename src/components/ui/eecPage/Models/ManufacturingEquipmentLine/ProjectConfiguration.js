export default class ProjectConfiguration {
    static plant = "PLANT1"
    static shop = "SHOP1"
    static line = "LINE1"
    static installation_location = "UL"

    static set(config){
        ProjectConfiguration.plant = config.plant;
        ProjectConfiguration.shop = config.shop;
        ProjectConfiguration.line = config.line;
        ProjectConfiguration.installation_location = config.installation_location;
    }
}