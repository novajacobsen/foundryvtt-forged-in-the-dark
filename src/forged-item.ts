
export interface ForgedItemInnerData {
    cohort: string[]
    scale: number
    quality: number
}

export class ForgedItem extends Item<Item.Data<ForgedItemInnerData>> {

    /* override */
    prepareData() {

        super.prepareData();

        const item_data = this.data;
        const data = item_data.data;

        if (item_data.type === "cohort") {

            this._prepareCohort();

        }
    }

    /**
     * Prepares Cohort data
     *
     * @param {object} data 
     */
    _prepareCohort() {

        let quality = 0;
        let scale = 0;

        // Adds Scale and Quality
        if (this.actor) {
            switch (this.data.data.cohort[0]) {
                case "Gang":
                    scale = parseInt(this.actor.data.data.tier[0]);
                    quality = parseInt(this.actor.data.data.tier[0]);
                    break;
                case "Expert":
                    scale = 1;
                    quality = parseInt(this.actor.data.data.tier[0]) + 1;
                    break;
            }
        }

        this.data.data.scale = scale;
        this.data.data.quality = quality;
    }
}
