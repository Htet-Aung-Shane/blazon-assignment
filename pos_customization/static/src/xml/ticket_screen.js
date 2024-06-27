/** @odoo-module */

import { TicketScreen } from "@point_of_sale/app/screens/ticket_screen/ticket_screen";
import { patch } from "@web/core/utils/patch";

patch(TicketScreen.prototype, {
    setup() {
        // Call the original setup method and store the result
        const res = super.setup(...arguments);

        // Set the DOB field value from props
        //this.changes.dob = this.props.partner.dob;

        // Return the original result
        return res;
    },
    async _fetchSyncedOrders() {
        console.log('fetching synced orders')
        const domain = this._computeSyncedOrdersDomain();
        const limit = this._state.syncedOrders.nPerPage;
        const offset =
            (this._state.syncedOrders.currentPage - 1) * this._state.syncedOrders.nPerPage;
        const config_id = this.pos.config.id;
        const { ordersInfo, totalCount } = await this.orm.call(
            "pos.order",
            "search_paid_order_ids",
            [],
            { config_id, domain, limit, offset }
        );
        const idsNotInCache = ordersInfo.filter(
            (orderInfo) => !(orderInfo[0] in this._state.syncedOrders.cache)
        );
        // If no cacheDate, then assume reasonable earlier date.
        const cacheDate = this._state.syncedOrders.cacheDate || DateTime.fromMillis(0);
        const idsNotUpToDate = ordersInfo.filter((orderInfo) => {
            return deserializeDateTime(orderInfo[1]) > cacheDate;
        });
        const idsToLoad = idsNotInCache.concat(idsNotUpToDate).map((info) => info[0]);
        if (idsToLoad.length > 0) {
            const fetchedOrders = await this.orm.call("pos.order", "export_for_ui", [idsToLoad]);
            // Check for missing products and partners and load them in the PoS
            await this.pos._loadMissingProducts(fetchedOrders);
            await this.pos._loadMissingPartners(fetchedOrders);
            // Cache these fetched orders so that next time, no need to fetch
            // them again, unless invalidated. See `_onInvoiceOrder`.
            fetchedOrders.forEach((order) => {
                this._state.syncedOrders.cache[order.id] = new Order(
                    { env: this.env },
                    { pos: this.pos, json: order }
                );
            });
            //Update the datetime indicator of the cache refresh
            this._state.syncedOrders.cacheDate = DateTime.local();
        }

        const ids = ordersInfo.map((info) => info[0]);
        this._state.syncedOrders.totalCount = totalCount;
        this._state.syncedOrders.toShow = ids.map((id) => this._state.syncedOrders.cache[id]);
    }
});
