let layers = [...document.querySelectorAll(".layer")];
let topLayer = document.querySelector(".skewed .top");

layers.forEach((layer, index) => {
	let contentBody = layers[next].querySelector(".content-body");
	let next = index > 0 ? 0 : 1;

	layer.addEventListener("mouseenter", () => {
		contentBody.style.opacity = 0;
		if (next) {
			topLayer.style.marginLeft = "-2000px";
		} else {
			topLayer.style.marginLeft = "550px";
		}
	});

	layer.addEventListener("mouseleave", () => {
		topLayer.style.marginLeft = "-1000px";
		//     Set all layers' content-body to 100% opacity as a cover all solution to the mouse leaving
		layers.forEach(() => {
			contentBody.style.opacity = 1;
		});
	});
});
