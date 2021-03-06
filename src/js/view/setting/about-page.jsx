// @flow

import React from 'react';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import * as SettingActionCreators from '../../action-creators/setting-action-creators';
import ClassName from '../../misc/class-name';
import Constants from '../../misc/constants';
import License from '../../misc/license';
import Themes from '../../model/themes';
import Button from '../common/button';
import CheckboxField from '../common/checkbox-field';

import type {RootState} from '../../store/root';

type Props = {
	fancy: boolean,
	onFancyChange: (fancy: boolean) => void,
	onForceReloadButtonClick: () => void,
};

const className = ClassName('setting', 'aboutPage');

class AboutPage extends React.Component<Props> {
	render() {
		const licenseElems = Themes.map((theme) => {
			if (!theme.license) {
				return null;
			}
			const {license} = theme;

			const detailLines = License[license](theme.author);
			const detailElems = detailLines.map((line, index) => {
				return (
					<p key={index}>{line}</p>
				);
			});

			return (
				<div
					className={className('section')}
					key={theme.id}
				>
					<h1 className={className('title')}>
						{theme.name}
					</h1>
					<div className={className('detail')}>
						{detailElems}
					</div>
				</div>
			);
		});

		return (
			<div className={className()}>
				<div className={className('section')}>
					<h1 className={className('title')}>
						Llumino PWA {Constants.version}
					</h1>
					<div className={className('detail')}>
						<p>Llumino is a luminous calculator that makes calculation more fun.</p>
						<p>This was originally developed as an iOS native app, and now re-built with the latest web technology. This is also a technical demonstration of PWA (Progressive Web App).</p>
					</div>
				</div>
				{licenseElems}
				<div className={className('section')}>
					<h1 className={className('title')}>
						Advanced
					</h1>
					<div className={className('formLayout')}>
						<div className={className('fieldLayout')}>
							<CheckboxField
								checked={this.props.fancy}
								onChange={this.props.onFancyChange}
								title="Fancy"
							/>
						</div>
						<div className={className('fieldLayout')}>
							<Button
								onClick={this.props.onForceReloadButtonClick}
								title="Force reload"
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state: RootState) {
	return {
		fancy: state.common.fancy,
	};
}

function mapDispatchToProps(dispatch: Redux.Dispatch<*>) {
	return {
		onForceReloadButtonClick() {
			dispatch(SettingActionCreators.forceReload());
		},
		onFancyChange(fancy: boolean) {
			dispatch(SettingActionCreators.updateFancy(fancy));
		},
	};
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(AboutPage);
