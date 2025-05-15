export default class ProjectConfiguration {
    static plant = "PLANT"
    static shop = "SHOP"
    static line = "LINE"
    static installation_location = "UL"

    static set(config){
        ProjectConfiguration.plant = config.plant;
        ProjectConfiguration.shop = config.shop;
        ProjectConfiguration.line = config.line;
        ProjectConfiguration.installation_location = config.installation_location;
    }
}