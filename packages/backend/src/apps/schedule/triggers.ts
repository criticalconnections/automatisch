import { IJSONObject } from '@automatisch/types';
import EveryHour from './triggers/every-hour';
import EveryDay from './triggers/every-day';
import EveryWeek from './triggers/every-week';

export default class Triggers {
  everyHour: EveryHour;
  everyDay: EveryDay;
  everyWeek: EveryWeek;

  constructor(connectionData: IJSONObject, parameters: IJSONObject) {
    this.everyHour = new EveryHour(parameters);
    this.everyDay = new EveryDay(parameters);
    this.everyWeek = new EveryWeek(parameters);
  }
}
