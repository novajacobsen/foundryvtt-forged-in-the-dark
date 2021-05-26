import coins from "../templates/parts/coins.hbs"
import attributes from "../templates/parts/attributes.hbs"
import turfList from "../templates/parts/turf-list.hbs"
import cohortBlock from "../templates/parts/cohort-block.hbs"
import factions from "../templates/parts/factions.hbs"

export const preloadHandlebarsTemplates = async () => {
    const templatePaths = [
        coins,
        attributes,
        turfList,
        cohortBlock,
        factions
    ];
    return await loadTemplates(templatePaths);
};
