import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

/**
 * Adds FontAwesome icons set
 */
library.add(fas);
dom.watch();

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).catch((err: any): void => console.error(err));
