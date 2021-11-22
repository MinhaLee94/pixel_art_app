// pallete upper left is white, upper right is selected color, bottom is black
// x: from white to selected color grad
// y: RGB (0~255): change 1 by 1px

// color spectrum goes from red to violet, and goes to red again
// so find the color border and apply gradient
// ff0000 - red, ff00ff - violet, 0000ff - blue ...
// x: white to selected color
// y: RGB (0~255): change 1 by 1px

import React, { useEffect } from "react";

const ColorPicker = () => {
	let colorBar = null;
	let colorBarContext = null;
	let palette = null;
	let paletteContext = null;
	let lastColor = null;

	useEffect(() => {
		init();
	})

	const init = () => {
		initColorBar();
		initPalette();
		drawPalette(255, 0, 0);
	}

	const initColorBar = () => {
		colorBar = document.getElementById('color-bar');
		colorBarContext = colorBar.getContext('2d');

		let width = colorBar.width = 20;
		let height = colorBar.height = 256;

		let gradient = colorBarContext.createLinearGradient(0, 0, width, height);
		gradient.addColorStop(0,'#ff0000');
		gradient.addColorStop(0.166,'#ff00ff');
		gradient.addColorStop(0.333,'#0000ff');
		gradient.addColorStop(0.5,'#00ffff');
		gradient.addColorStop(0.666,'#00ff00');
		gradient.addColorStop(0.834,'#ffff00');
		gradient.addColorStop(1,'#ff0000');

		colorBarContext.fillStyle = gradient;
		colorBarContext.fillRect(0, 0, width, height);

		colorBar.onclick = function(e) {
			let y = e.pageY - colorBar.offsetTop;
			let c = colorBarContext.getImageData(0, y, 1, 1).data;
			drawPalette(c[0], c[1], c[2]);
		};
	};

	const initPalette = () => {
		palette = document.getElementById('palette');
		paletteContext = palette.getContext('2d');

		palette.width = 256;
		palette.height = 256;
	};

	const drawPalette = (r, g, b) => {
		var nowColor = (r+'-'+g+'-'+b);
		if (lastColor === nowColor) { return; } else { lastColor = nowColor; }
		
		for (let i = 0; i < 255; ) {
			var leftColor = 255 - i; // left color from top to bottom
			
			// drawing part
			var grd = paletteContext.createLinearGradient(0, 0, 256, 1);
			grd.addColorStop(0,'rgb('+leftColor+', '+leftColor+', '+leftColor+')');
			grd.addColorStop(1,'rgb('+r+', '+g+', '+b+')');
			paletteContext.fillStyle = grd;
			paletteContext.fillRect(0, i++, 256, i);

			// dropping brightness by 1 for each rgb
			if (r > 0) { r--; }
			if (g > 0) { g--; }
			if (b > 0) { b--; }
		}
	}

	return (
		<>
			<canvas id="palette" style={{ width:256, height:256, marginRight: 10 }}></canvas>
			<canvas id="color-bar" style={{ width:20, height:256 }}></canvas>
		</>
	);
}

export default ColorPicker;
