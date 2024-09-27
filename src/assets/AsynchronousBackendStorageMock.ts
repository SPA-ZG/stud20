export class AsynchronousBackendStorageMock {
    private static _instance: AsynchronousBackendStorageMock | null = null;

    private forecasts:any[] = []

    private constructor() {

    }

    public static getInstance(): AsynchronousBackendStorageMock {
        if (!AsynchronousBackendStorageMock._instance) {
            AsynchronousBackendStorageMock._instance = new AsynchronousBackendStorageMock();
        }

        return AsynchronousBackendStorageMock._instance;
    }

    public async storeForecast(forecast: any) {
        await this.sleep(500);
        this.forecasts.push(forecast);
    }

    public async getForecast(latitude: number, longitude: number, startDate: string, endDate: string): Promise<any | null> {
        await this.sleep(1000);
        for (let forecast of this.forecasts) {
            if (this.equalLatLon(forecast.latitude, latitude, forecast.longitude, longitude)) {
                if (new Date(forecast.daily.time[0]).getTime() === new Date(startDate).getTime()) {
                    if (new Date(forecast.daily.time[forecast.daily.time.length - 1]).getTime() === new Date(endDate).getTime()) {
                        return forecast;
                    }
                }
            }
        }
        return null;
    }

    private static TOLERANCE = 0.01
    private equalLatLon(lat1: number, lat2: number, lon1: number, lon2: number) {
        return Math.abs(lat1-lat2) < AsynchronousBackendStorageMock.TOLERANCE && Math.abs(lon1-lon2) < AsynchronousBackendStorageMock.TOLERANCE;
    }

    private sleep(milliseconds: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }
}