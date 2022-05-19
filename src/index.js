import React, { useEffect, useState } from 'react';
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
	let fileSrc = 'https://microsoft.github.io/SandDance/sample-data/demovote.tsv';

	const [tableData, setTableData] = useState([]);

	useEffect(() => {
		handleData({ dataUrl: fileSrc, type: 'tsv' })
	}, []);

	const handleData = (dataFile) => {
		let loader = vega.loader();

		function handleRawText(text) {
			let data = vega.read(text, {
				type: dataFile.type,
				parse: 'auto'
			});
			setTableData(data)
		}
		loader.load(dataFile.dataUrl).then(handleRawText);
	}

	useEffect(() => {
		if (tableData.length > 0) {
			const explorerProps = {
				logoClickUrl: 'javascript:;',
				logoClickTarget: '_self',
				mounted: explorer => {
					explorer.load(tableData);
				}
			};
			fluentui.initializeIcons();
			use(fluentui, React, ReactDOM, vega, deck, layers, luma);
			ReactDOM.render(React.createElement(Explorer, explorerProps), document.getElementById('app'));
		}
	}, [tableData])

	return (
		<>
			<header style={{ backgroundColor: '#1293f9', height: '60px' }}></header>
			<section style={{ backgroundColor: '#f7f7f7', color: 'teal', padding: '15px' }}>
				sanddance - the core SandDance visualization canvas.
				sanddance-react - the core SandDance visualization canvas for use in React based applications.
				sanddance-vue - the core SandDance visualization canvas for use in Vue based applications.
				sanddance-explorer - the core SandDance visualization canvas with UI to enable data exploration, for use in React based applications.
				Publications
			</section>
			<div id="app"></div>
		</>
	)
}


ReactDOM.render(<Visualization />, document.getElementById('root'));
