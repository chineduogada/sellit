import React from "react";
import SearchBox from "../SearchBox";
import svg from "../../assets/svg/page-not-found.svg";

function Showcase() {
	return (
		<section className='Showcase'>
			<div className='container flex-jc-sb'>
				<div className='Showcase__content'>
					<h1 className='Showcase__heading yotta'>
						connect to our platform and sell almost anything.
					</h1>

					<ul className='Showcase__texts'>
						<li className='Showcase__text mega'>
							we connect buyers and sellers together.
						</li>
						<li className='Showcase__text mega'>
							we offer smooth communication system.
						</li>
						<li className='Showcase__text mega'>
							connect to a seller with having to register.
						</li>
						<li className='Showcase__text mega'>
							find hot trending products.
						</li>
					</ul>
					<SearchBox placeholder='find any product of your choice.' />
				</div>

				<div className='Showcase__svg-wrapper'>
					<img
						className='Showcase__svg'
						src={svg}
						aria-label='showcase-svg'
						alt='showcase-svg'
					/>
				</div>
			</div>
		</section>
	);
}

export default Showcase;

