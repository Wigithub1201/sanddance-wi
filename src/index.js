import React, { useEffect } from 'react';
import * as deck from '@deck.gl/core';
import * as layers from '@deck.gl/layers';
import * as luma from '@luma.gl/core';
import * as vega from 'vega';
import * as ReactDOM from 'react-dom';
import { Explorer, use } from '@msrvida/sanddance-explorer';
import * as fluentui from '@fluentui/react';
import './sanddance-app.css';
import './sanddance-app-site.css';
import './sanddance-explorer.css';

const Visualization = (props) => {
	const data = [
		{ a: 1, b: "c1" },
		{ a: 1, b: "c2" },
		{ a: 2, b: "c3" },
		{ a: 3, b: "c4" }
	];

	useEffect(() => {
		if (data.length > 0) {
			const explorerProps = {
				logoClickUrl: 'javascript:;',
				logoClickTarget: '_self',
				mounted: explorer => {
					explorer.load(data);
				}
			};
			fluentui.initializeIcons();
			use(fluentui, React, ReactDOM, vega, deck, layers, luma);
			ReactDOM.render(React.createElement(Explorer, explorerProps), document.getElementById('app'));
		}
	}, [])

	return (
		<>
			<div id="app"></div>
		</>
	)
}


ReactDOM.render(<Visualization />, document.getElementById('root'));
