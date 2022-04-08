/*
 * This file is part of Cockpit.
 *
 * Copyright (C) 2017 Red Hat, Inc.
 *
 * Cockpit is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation; either version 2.1 of the License, or
 * (at your option) any later version.
 *
 * Cockpit is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Cockpit; If not, see <http://www.gnu.org/licenses/>.
 */

// import cockpit from 'cockpit';
import React from 'react';
// import FontAwesomeIcon from 'react-fontawesome';
import { Page, PageSection, Stack } from '@patternfly/react-core';
import ConfigFileHandler from "./ConfigFileHandler.jsx";
// import Header from "./Header.jsx";
// import GlobalSettings from "./GlobalSettings.jsx";
import Shares from "./Shares.jsx";

// const _ = cockpit.gettext;

export class Application extends React.Component {
    constructor() {
        super();
        this.state = { handler: new ConfigFileHandler(() => { this.forceUpdate() }) };
    }

    render() {
        // const header = <Header />;
        // const globalSettings = <GlobalSettings handler={this.state.handler} />;
        const shares = <Shares handler={this.state.handler} />;

        return (
            <Page id="overview" key="overview">
                <PageSection>
                    <Stack hasGutter>
                        {shares}
                    </Stack>
                </PageSection>
            </Page>
        );
        // <FontAwesomeIcon icon={["fa-solid", "fa-trash-can"]} />
    }
}
