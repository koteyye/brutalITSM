export function registerRoutes(router, routes) {
    for (const route of routes) {
        router.addRoute(route)
    }
}