module.exports = class extends window.casthub.elements.user {

    /**
     * Initialize the new Module.
     */
    constructor() {
        super();

        // Set the params for the User Module parent.
        this.icon = 'youtube';
        this.color = '#CC0000';
        this.setLabels({
            subscribers: {
                name: 'Subscribers',
                label: -1,
                enabled: true,
            },
        });
    }

    /**
     * Run any asynchronous code when the Module is mounted to DOM.
     *
     * @return {Promise}
     */
    async mounted() {
        await super.mounted();

        // Refresh for initial data.
        await this.refresh();

        // Then refresh every 10 seconds after.
        setInterval(() => this.refresh(), 10000);
    }

    /**
     * Fetches fresh data from the YouTube API.
     *
     * @return {Promise}
     */
    async refresh() {
        this.avatar = this.identity.image;

        const response = await window.casthub.fetch({
            integration: 'youtube',
            method: 'GET',
            url: 'channels',
            data: {
                part: 'statistics',
                mine: 'true',
            },
        });

        if (response.items.length) {
            this.setLabel('subscribers', parseInt(response.items[0].statistics.subscriberCount));
        }
    }

};
