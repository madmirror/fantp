import React from 'react';
import {connect} from 'react-redux';
import Card from '../../commonComponents/Card';
import SummaryItem from './SummaryItem';

const isNull = (value, ifIsNullValue) => value!=null?value:ifIsNullValue;

const mapState = state => {

	let {rootNodes, flatSteps} = state.stepMap;
	return {
		rootNodes, flatSteps
	};
}
@connect(mapState)
class TripSummary extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let {activeNodes, rootNodes, flatSteps, nextStepClick, btnText, btnClick} = this.props;
		console.log(activeNodes);
		// let total = activeNodes.reduce((acc, cur) => acc + flatSteps[cur].price || 0, 0);
		let total = activeNodes.map(nd => flatSteps[nd].price || 0).reduce((acc, cur) => acc+cur, 0)
		console.log(total)
		return (
				<div className="trip-summary">
					<Card title="">
						<h3 className="summary-title">旅程预算</h3>
						{
							rootNodes.map((rn, index) => {
								return <SummaryItem index={index} rootId={rn} activeNodes={activeNodes} />
							})
						}
						<Card>
							
						<div className="row">
							<div className="col-sm-3 title-col">预计总算</div>
							<div className="col-sm-9">${total} - ${Math.floor(total*1.2)}</div>
						</div>	
						</Card>
						<button className="btn btn-success-outline btn-block" onClick={nextStepClick}>{btnText||'下一步'}</button>
					</Card>
				</div>
			);
	}
}

export default TripSummary;
