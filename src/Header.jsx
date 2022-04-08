import React from 'react';
import {
    Card, CardBody, CardHeader, CardTitle,
} from '@patternfly/react-core';

export class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
        };

        this.cardRef = React.createRef();
    }

    render() {
        const title = "Apple File Protocol Configuration";
        const card = (
            <Card id="header" className="header">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardBody />
            </Card>
        );

        return <div ref={this.cardRef}>{card}</div>;
    }
}

export default Header;
