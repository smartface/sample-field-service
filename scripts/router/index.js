const Application = require("sf-core/application");

const sliderDrawer = require("../sliderDrawer");

const {
    NativeRouter: Router,
    NativeStackRouter: StackRouter,
    Route
} = require("@smartface/router");

const router = exports = module.exports = Router.of({
    path: "/",
    isRoot: true,
    routes: [
        Route.of({
            path: "/pages/pgLogin",
            routeDidEnter: (router, route) => {
            },
            routeDidExit: (router, route) => {},
            build: (router, route) => {
                const { routeData, view } = route.getState();
                let pgLogin = require("pages/pgLogin");
                return new pgLogin(routeData, router);
            }
        }),
        StackRouter.of({
            path: "/slider",
            routes: [
                Route.of({
                    path: "/slider/pgDashboard",
                    routeDidEnter: (router, route) => {
                        sliderDrawer.enabled = true;
                        sliderDrawer.hide();
                    },
                    routeDidExit: (router, route) => {},
                    build: (router, route) => {
                        const { routeData, view } = route.getState();
                        let pgDashboard = require("pages/pgDashboard");
                        return new pgDashboard(routeData, router, sliderDrawer);
                    }
                }),
                Route.of({
                    path: "/slider/pgNotification",
                    routeDidEnter: (router, route) => {
                        sliderDrawer.enabled = true;
                        sliderDrawer.hide();
                    },
                    routeDidExit: (router, route) => {},
                    build: (router, route) => {
                        const { routeData, view } = route.getState();
                        let pgNotification = require("pages/pgNotification");
                        return new pgNotification(routeData, router, sliderDrawer);
                    }
                }),
                Route.of({
                    path: "/slider/pgSettings",
                    routeDidEnter: (router, route) => {
                        sliderDrawer.enabled = true;
                        sliderDrawer.hide();
                    },
                    routeDidExit: (router, route) => {},
                    build: (router, route) => {
                        const { routeData, view } = route.getState();
                        let pgSettings = require("pages/pgSettings");
                        return new pgSettings(routeData, router, sliderDrawer);
                    }
                }),
                StackRouter.of({
                    path: "/slider/customersPage",
                    modal : true,
                    routes: [
                        Route.of({
                            path: "/slider/customersPage/pgCustomerFilter",
                            routeDidEnter: (router, route) => {
                                sliderDrawer.enabled = true;
                                sliderDrawer.hide();
                            },
                            routeDidExit: (router, route) => {},
                            build: (router, route) => {
                                const { routeData, view } = route.getState();
                                let pgCustomerFilter = require("pages/pgCustomerFilter");
                                return new pgCustomerFilter(routeData, router, sliderDrawer);
                            }
                        }),
                        Route.of({
                            path: "/slider/customersPage/pgCustomers",
                            routeDidEnter: (router, route) => {},
                            routeDidExit: (router, route) => {},
                            build: (router, route) => {
                                const { routeData, view } = route.getState();
                                let pgCustomers = require("pages/pgCustomers");
                                return new pgCustomers(routeData, router);
                            }
                        }),
                        Route.of({
                            path: "/slider/customersPage/pgNewCustomer",
                            routeDidEnter: (router, route) => {},
                            routeDidExit: (router, route) => {},
                            build: (router, route) => {
                                const { routeData, view } = route.getState();
                                let pgNewCustomer = require("pages/pgNewCustomer");
                                return new pgNewCustomer(routeData, router);
                            }
                        }),
                        Route.of({
                            path: "/slider/customersPage/pgCustomerDetails",
                            routeDidEnter: (router, route) => {},
                            routeDidExit: (router, route) => {},
                            build: (router, route) => {
                                const { routeData, view } = route.getState();
                                let pgCustomerDetails = require("pages/pgCustomerDetails");
                                return new pgCustomerDetails(routeData, router);
                            }
                        }),
                        Route.of({
                            path: "/slider/customersPage/pgNotes",
                            routeDidEnter: (router, route) => {},
                            routeDidExit: (router, route) => {},
                            build: (router, route) => {
                                const { routeData, view } = route.getState();
                                let pgNotes = require("pages/pgNotes");
                                return new pgNotes(routeData, router);
                            }
                        }),
                        Route.of({
                            path: "/slider/customersPage/pgSelectMap",
                            routeDidEnter: (router, route) => {},
                            routeDidExit: (router, route) => {},
                            build: (router, route) => {
                                const { routeData, view } = route.getState();
                                let pgSelectMap = require("pages/pgSelectMap");
                                return new pgSelectMap(routeData, router);
                            }
                        }),
                        Route.of({
                            path: "/slider/customersPage/pgNoteContent",
                            routeDidEnter: (router, route) => {},
                            routeDidExit: (router, route) => {},
                            build: (router, route) => {
                                const { routeData, view } = route.getState();
                                let pgNoteContent = require("pages/pgNoteContent");
                                return new pgNoteContent(routeData, router);
                            }
                        })
                    ]
                }),
            ]
        })
    ]
});

sliderDrawer.router = router;
Application.sliderDrawer = sliderDrawer;

router.push("/pages/pgLogin");

