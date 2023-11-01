import { styled } from 'styled-components';

import equalizerLine from './assets/equalizer-line.svg';
import arrowDownSLine from './assets/arrow-down-s-line.svg';
import arrowLeftRightLine from './assets/arrow-left-right-line.svg';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useClickOutside } from './hooks/useClickOutside';
import foxImage from './assets/fox.jpeg';

function App() {
	const [searchParams, setSearchParams] = useSearchParams();
	// const [results, setResults] = useState([]);

	const page = Number(searchParams.get('page')) || 1;

	// useEffect(() => {
	// 	fetch(`https://fakestoreapi.com/products?limit=${page * 16}`)
	// 		.then((res) => res.json())
	// 		.then((res) => {
	// 			setResults(res.slice((page - 1) * 16, page * 16));
	// 		});
	// }, [searchParams, page]);
	return (
		<div>
			<TopBar>
				<Title>Navbar</Title>
			</TopBar>
			<FilterContainer>
				<FiltersButton />
				<SortButton />
			</FilterContainer>
			<Container>
				<ResultContainer>
					<ResultTextContainer>
						<ResultText>Result for “Fox in the Box”</ResultText>
					</ResultTextContainer>
					<Results>
						{Array.from(
							{
								length: 16,
							},
							(result, i) => (
								<Result key={i}>
									<ResultImage src={foxImage} />
									<ResultContent>
										<ResultTitleContainer>
											<ResultTitle>Fox in the Box</ResultTitle>
											<ResultDescription>
												Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque nihil illum, unde itaque
												dignissimos consequatur.
											</ResultDescription>
										</ResultTitleContainer>
									</ResultContent>
									<PriceContainer>
										<Price>$999</Price>
										<PriceDiscount>$777</PriceDiscount>
									</PriceContainer>
								</Result>
							),
						)}
					</Results>
					<PaginationContainer>
						<Pagination>
							{Array.from({ length: 9 }, (_, i) => (
								<PaginationButton
									key={i}
									data-active={page === i + 1}
									onClick={() => {
										setSearchParams(
											removeNullish({
												page: i + 1,
												sort: searchParams.get('sort'),
												filter: searchParams.get('filter'),
											}),
										);
									}}
								>
									{i + 1}
								</PaginationButton>
							))}
						</Pagination>
					</PaginationContainer>
				</ResultContainer>
			</Container>
		</div>
	);
}

export default App;

const Button = styled.button`
	background: transparent;
	border: none;
	outline: none;
	cursor: pointer;
`;

const TopBar = styled.div`
	display: flex;
	width: 100%;
	height: 60px;
	padding: 20px 0px;
	justify-content: center;
	align-items: center;
	background: #fff;
`;

const Title = styled.h1`
	color: #000;
	text-align: center;
	font-family: Inter;
	font-size: 16px;
	font-weight: 600;
	line-height: 20px;
`;

const FilterContainer = styled.div`
	display: flex;
	width: 100%;
	padding: 8px 32px;
	justify-content: space-between;
	align-items: center;
	background: #f4f4f4;
`;

const FilterButtonContainer = styled.div`
	position: relative;
`;

const FilterButton = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 4px;
	cursor: pointer;
`;

const Filter = styled.h3`
	color: #646464;
	text-align: center;
	font-family: Inter;
	font-size: 16px;
	font-weight: 500;
	line-height: 20px;
`;

const SortContainer = styled.div`
	padding: 16px 0px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 4px;
	position: absolute;
	top: 100%;
	right: 0;
	height: 114px;
	width: 164px;
	border-radius: 0px 0px 12px 12px;
	background: #f4f4f4;
	display: none;

	${FilterButtonContainer}[data-open='true'] & {
		display: flex;
	}
`;

const SortOption = styled(Button)`
	display: flex;
	width: 100%;
	padding: 8px 16px;
	align-items: center;
	gap: 4px;

	&:hover,
	&[data-active='true'] {
		background: #ebebeb;
	}
`;

const SortOptionText = styled.span`
	color: #181818;
	font-family: Inter;
	font-size: 16px;
	font-weight: 500;
	line-height: 20px;
`;

const FilterDropdown = styled.div`
	padding: 16px 0px;
	width: 164px;
	flex-direction: column;
	align-items: center;
	background: #f4f4f4;
	gap: 4px;
	position: absolute;
	top: 100%;
	left: 0;
	height: 200px;
	border-radius: 0px 0px 12px 12px;
	display: none;

	${FilterButtonContainer}[data-open='true'] & {
		display: flex;
	}
`;

const FilterDropdownItem = styled(Button)`
	width: 100%;
	padding: 8px 16px;
	align-items: center;

	&:hover,
	&[data-active='true'] {
		background: #ebebeb;
	}
`;

const FilterDropdownItemText = styled.span`
	color: #181818;
	font-family: Inter;
	font-size: 16px;
	font-weight: 500;
	line-height: 20px;
`;

const Container = styled.div`
	background: #ededed;
`;

const ResultContainer = styled.div`
	max-width: 1728px;
	width: 100%;
	margin: 0 auto;
`;

const ResultTextContainer = styled.div`
	display: flex;
	width: 100%;
	padding: 24px 32px;
	justify-content: center;
	align-items: center;
`;

const ResultText = styled.h3`
	color: #7b7f81;
	text-align: center;
	font-family: Inter;
	font-size: 24px;
	font-weight: 500;
	line-height: 28px;
	width: 322px;

	@media (max-width: 1200px) {
		font-size: 16px;
	}

	@media (max-width: 600px) {
		font-size: 14px;
	}
`;

const Results = styled.div`
	display: grid;
	width: 100%;
	padding: 0px 32px;
	gap: 36px 20px;
	grid-template-columns: repeat(4, minmax(0, 1fr));

	@media (max-width: 1200px) {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	@media (max-width: 900px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	@media (max-width: 600px) {
		grid-template-columns: repeat(1, minmax(0, 1fr));
	}
`;

const Result = styled.div`
	display: flex;
	padding: 20px 16px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 12px;
	flex: 1 0 0;
	border-radius: 12px;
	background: #f4f4f4;

	&:hover {
		box-shadow:
			0px 2px 5px 0px rgba(0, 0, 0, 0.05),
			0px 6px 10px 0px rgba(0, 0, 0, 0.07);
	}
`;

const ResultImage = styled.img`
	height: 180px;
	border-radius: 12px;
	width: 100%;
	object-fit: cover;
`;

const ResultContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	gap: 12px;
	align-self: stretch;
`;

const ResultTitleContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	gap: 8px;
	align-self: stretch;
`;

const ResultTitle = styled.h3`
	color: #464646;
	font-family: Inter;
	font-size: 20px;
	font-weight: 600;
	line-height: 24px;
	letter-spacing: -0.4px;
`;

const ResultDescription = styled.p`
	color: #646464;
	font-family: Inter;
	font-size: 16px;
	font-weight: 400;
	line-height: 20px;
`;

const PriceContainer = styled.div`
	display: flex;
	height: 24px;
	width: 100%;
	align-items: baseline;
	justify-content: flex-start;
	align-content: center;
	gap: 4px;
`;

const Price = styled.span`
	color: #000;
	text-align: center;
	font-family: Inter;
	font-size: 20px;
	font-weight: 600;
	line-height: 24px;
`;

const PriceDiscount = styled.span`
	color: #646464;
	text-align: center;
	font-family: Inter;
	font-size: 16px;
	font-weight: 400;
	line-height: 20px;
	text-decoration-line: line-through;
`;

const PaginationContainer = styled.div`
	padding-top: 60px;
	padding-bottom: 124px;
	width: 100%;
	display: flex;
	justify-content: center;
	item-align: center;
`;

const Pagination = styled.div`
	width: 300px;
	height: 40px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-radius: 12px;
	background: #fff;
	padding: 0px 22px;
`;

const PaginationButton = styled(Button)`
	color: #646464;
	text-align: center;
	font-family: Inter;
	font-size: 16px;
	font-weight: 500;
	line-height: 18px;

	&:hover,
	&[data-active='true'] {
		color: #000;
	}
`;

const FiltersButton = () => {
	const [open, setOpen] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const ref = useClickOutside(() => setOpen(false));

	const active = searchParams.get('filter');

	return (
		<FilterButtonContainer data-open={open} ref={ref}>
			<FilterButton
				onClick={() => {
					setOpen((prev) => !prev);
				}}
			>
				<img src={equalizerLine} alt="equalizer-line" height={20} width={20} />
				<Filter>filters</Filter>
			</FilterButton>
			<FilterDropdown>
				{Array.from({ length: 4 }, (_, i) => (
					<FilterDropdownItem
						key={i}
						data-active={active === `category-${i + 1}`}
						onClick={() => {
							setSearchParams(
								removeNullish({
									filter: `category-${i + 1}`,
									sort: searchParams.get('sort'),
									page: searchParams.get('page'),
								}),
							);
						}}
					>
						<FilterDropdownItemText>Category {i + 1}</FilterDropdownItemText>
					</FilterDropdownItem>
				))}
			</FilterDropdown>
		</FilterButtonContainer>
	);
};

const SortButton = () => {
	const [open, setOpen] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const ref = useClickOutside(() => setOpen(false));

	const active = searchParams.get('sort');

	return (
		<FilterButtonContainer data-open={open} ref={ref}>
			<FilterButton
				onClick={() => {
					setOpen((prev) => !prev);
				}}
			>
				<img src={arrowDownSLine} alt="equalizer-line" height={20} width={20} />
				<Filter>sort-by</Filter>
			</FilterButton>
			<SortContainer>
				<SortOption
					data-active={active === 'high-to-low'}
					onClick={() => {
						setSearchParams(
							removeNullish({
								sort: 'high-to-low',
								filter: searchParams.get('filter'),
								page: searchParams.get('page'),
							}),
						);
					}}
				>
					<img src={arrowLeftRightLine} alt="equalizer-line" height={16} width={16} />
					<SortOptionText>high to low</SortOptionText>
				</SortOption>
				<SortOption
					data-active={active === 'low-to-high'}
					onClick={() => {
						setSearchParams(
							removeNullish({
								sort: 'low-to-high',
								filter: searchParams.get('filter'),
								page: searchParams.get('page'),
							}),
						);
					}}
				>
					<img src={arrowLeftRightLine} alt="equalizer-line" height={16} width={16} />
					<SortOptionText>low to high</SortOptionText>
				</SortOption>
			</SortContainer>
		</FilterButtonContainer>
	);
};

const removeNullish = (obj) => {
	const newObj = {};
	for (const [key, value] of Object.entries(obj)) {
		if (value) {
			newObj[key] = value;
		}
	}
	return newObj;
};
