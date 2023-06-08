import Swiper from "swiper";
import sliderFactory from "./slider";
import { Tabs } from "./tabs";
import { Animate } from "./animate";

class App {
	constructor() {
		this.createSliders();
		this.initTabs();
		this.initAnimate();
	}
	
	createSliders() {
		const el = document.querySelectorAll("[data-slider]");
		
		if (el) this.sliders = [];
		
		el.forEach(item => {
			
			let slider = this.initSlider(item);
			
			item.onkeydown = evt => {
				if (evt.key === "Tab") {
					evt.preventDefault();
				}
			};
			
			const updateSlider = () => {
				if (typeof slider === "undefined") {
					slider = this.initSlider(item);
					slider.update();
				}
			};
			
			const changeStateOfSlider = (width) => {
				if (width <= 1200) {
					if (typeof slider !== "undefined") {
						slider.destroy(true, true);
						slider = undefined;
					}
				} else {
					updateSlider();
				}
			};
			
			if (item.hasAttribute("data-mobile")) {
				changeStateOfSlider(window.innerWidth);
				window.addEventListener("resize", () => {
					changeStateOfSlider(window.innerWidth);
				});
			}
			
			this.sliders.push(slider);
		});
	}
	
	initSlider(item) {
		return new Swiper(
			item.querySelector("[data-slide]"),
			sliderFactory(item)
		);
	}
	
	initTabs() {
		const el = document.querySelectorAll("[data-tabs-container]");
		el.forEach(item => new Tabs(item));
	}
	
	initAnimate() {
		const el = document.querySelectorAll("[data-animation]");
		el.forEach(item => new Animate(item));
	}
}

export default App;