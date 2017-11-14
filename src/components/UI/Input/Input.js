import React from 'react';

import classes from './Input.css';

const input = (props) => {

	let inputElement = null;

	const inputClasses = [classes.InputElement];
	if(!props.valid && props.touched)
		inputClasses.push(classes.Error);

	switch(props.kind) {
		case ('textarea'):
			inputElement = <textarea onChange={props.handler} className={inputClasses.join(' ')} {...props.config}>{props.value}</textarea>;
			break;
		case ('select'):
			inputElement = (
				<select onChange={props.handler} className={inputClasses.join(' ')} value={props.value}>
					{props.config.options.map(opt => (
						<option key={opt.value} value={opt.value}>{opt.label}</option>
					))}
				</select>
			);
			break;
		default:
			inputElement = <input onChange={props.handler} className={inputClasses.join(' ')} {...props.config} value={props.value} />
			break;
	}

	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{inputElement}
		</div>
	);

}

export default input;