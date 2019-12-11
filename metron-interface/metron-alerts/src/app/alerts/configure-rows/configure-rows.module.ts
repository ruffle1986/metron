/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ConfigureRowsComponent } from './configure-rows.component';
import { ShowHideAlertEntriesComponent } from './show-hide/show-hide-alert-entries.component';
import { SwitchModule } from 'app/shared/switch/switch.module';
import { QueryBuilder } from '../alerts-list/query-builder';
import { ShowHideService } from './show-hide/show-hide.service';
import { TimezoneConfigComponent } from './timezone-config/timezone-config.component';
import { TimezoneConfigService } from './timezone-config/timezone-config.service';
import { AppConfigService } from 'app/service/app-config.service';
import { UserSettingsService } from 'app/service/user-settings.service';

@NgModule({
    imports: [ SharedModule, SwitchModule ],
    declarations: [ ConfigureRowsComponent, ShowHideAlertEntriesComponent, TimezoneConfigComponent ],
    exports: [ ConfigureRowsComponent ],
    providers: [ AppConfigService, UserSettingsService, QueryBuilder, ShowHideService, TimezoneConfigService, ],
})
export class ConfigureRowsModule {}
