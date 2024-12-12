import debounce from "lodash.debounce";
import React from "react";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";
import styles from "./search.module.scss";
const Search: React.FC = () => {
	const dispatch = useDispatch();
	const [value, setValue] = React.useState("");
	const inputRef = React.useRef<HTMLInputElement>(null);

	const handleClickClear = () => {
		dispatch(setSearchValue(""));
		setValue("");
		inputRef.current?.focus();
	};

	const updateSearchValue = React.useCallback(
		debounce((str) => {
			dispatch(setSearchValue(str));
		}, 250),
		[]
	);

	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
		updateSearchValue(event.target.value);
	};

	return (
		<div className={styles.root}>
			<svg
				className={styles.icon}
				height="512px"
				id="Layer_1"
				version="1.1"
				viewBox="0 0 512 512"
				width="512px"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M448.3,424.7L335,311.3c20.8-26,33.3-59.1,33.3-95.1c0-84.1-68.1-152.2-152-152.2c-84,0-152,68.2-152,152.2  s68.1,152.2,152,152.2c36.2,0,69.4-12.7,95.5-33.8L425,448L448.3,424.7z M120.1,312.6c-25.7-25.7-39.8-59.9-39.8-96.3  s14.2-70.6,39.8-96.3S180,80,216.3,80c36.3,0,70.5,14.2,96.2,39.9s39.8,59.9,39.8,96.3s-14.2,70.6-39.8,96.3  c-25.7,25.7-59.9,39.9-96.2,39.9C180,352.5,145.8,338.3,120.1,312.6z" />
			</svg>
			{value && (
				<svg
					onClick={handleClickClear}
					className={styles.close}
					viewBox="0 0 96 96"
					xmlns="http://www.w3.org/2000/svg"
				>
					<title />
					<g>
						<path d="M48,0A48,48,0,1,0,96,48,48.0512,48.0512,0,0,0,48,0Zm0,84A36,36,0,1,1,84,48,36.0393,36.0393,0,0,1,48,84Z" />
						<path d="M64.2422,31.7578a5.9979,5.9979,0,0,0-8.4844,0L48,39.5156l-7.7578-7.7578a5.9994,5.9994,0,0,0-8.4844,8.4844L39.5156,48l-7.7578,7.7578a5.9994,5.9994,0,1,0,8.4844,8.4844L48,56.4844l7.7578,7.7578a5.9994,5.9994,0,0,0,8.4844-8.4844L56.4844,48l7.7578-7.7578A5.9979,5.9979,0,0,0,64.2422,31.7578Z" />
					</g>
				</svg>
			)}
			<input
				ref={inputRef}
				value={value}
				onChange={onChangeInput}
				className={styles.input}
				placeholder="Поиск..."
			/>
		</div>
	);
};

export default Search;
