// QuestionCard.js

'use strict';

import React, { Component, }  from 'react';
import {
  Dimensions,
  ListView, ScrollView,
  Text,View,Image,
  TouchableHighlight, TouchableOpacity,
  StyleSheet
} from "react-native";

import { targetStatus, targetKey } from 'fbw-platform-common/selectors/mission'

var _ = require('lodash');
import baseStyles from 'fbw-platform-common/styles/base-styles'

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    // backgroundColor: '#fffdfb',
    // backgroundColor: '#333'
  },
  scrollView: {
    paddingLeft: 10.5,
    paddingRight: 10.5,
  },
  carouselContainer: {
    flexDirection: 'column',
    // backgroundColor: '#ddd',
    paddingLeft: 8.5,
    paddingTop: 8.5,
    flex: 1,
  },
  carouselLabel: {
    fontSize: 10,
    fontWeight: "700",
    fontStyle: "italic"
  },
  thumb: {
    width: 70,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent'
  },
  selectedThumb: {
    borderBottomColor: baseStyles.appBlueDark
  },
  thumbLabel: {
    marginBottom: 0,
    marginTop: 5,
    fontSize: 10,
    color: '#888',
    textAlign: 'center',
  },
  flex: {
    flexDirection: 'row'
  },
  statusSummary: {
    width: 80,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    opacity: 1
  },
  emphasis: {
    fontWeight: "700",
  },
  mute: {
    color: '#888',
    fontSize: 12,
    fontWeight: "300",
  },
});


class TargetCarousel extends Component {
  _renderTarget = (target) => {
    let targetNumber = targetKey(target);
    let currentSection = this.props.currentMissionSections[this.props.currentDirectiveIndex];
    let sectionQuestions = currentSection.questions;
    let targetRouteQuestions = _.filter(sectionQuestions, question => question.displayName.text[0].startsWith(targetNumber));

    let status = targetStatus(target, targetRouteQuestions);

    let image;
    switch(status) {
      case 'COMPLETE':
        image = <Image source={require('fbw-platform-common/assets/target-question--correct@2x.png')}/>;
        break;
      case 'FAIL':
        image = <Image source={require('fbw-platform-common/assets/target-question--incorrect@2x.png')}/>;
        break;
      case 'NAVIGATED':
        image = <Image source={require('fbw-platform-common/assets/target-question--navigated@2x.png')}/>;
        break;
      case 'PRISTINE':
        image = <Image source={require('fbw-platform-common/assets/target-question@2x.png')}/>;
        break;

      default:
        console.warn('Warning: unrecognized status', status);
        image = <Image source={require('fbw-platform-common/assets/target-question@2x.png')}/>;
    }

    let accessibilityLabel = `Target Question ${target.displayName.text}`;
    let thumb = (
      <TouchableOpacity accessibilityLabel={accessibilityLabel}
                          onPress={() => this.props.onSelectTarget(target)}
                          style={[styles.thumb, targetNumber === targetKey(this.props.currentTarget) ? styles.selectedThumb : null]} key={target.id}>
        <View>
          {image}
          <Text style={styles.thumbLabel}>{target.displayName.text}</Text>
        </View>
      </TouchableOpacity>)

    return thumb;

  }

  render() {
    // let totalQuestions = this.props.targets.length || 0,
      // requiredAccessibilityLabel = `Required: ${this.props.requiredNumber} of ${totalQuestions}`;
    if (!this.props.targets || this.props.targets.length === 0) {
      return <View />
    }
    return (
      <View style={styles.container}>
        <View style={styles.carouselContainer}>
          <ScrollView
            automaticallyAdjustContentInsets={false}
            horizontal={true}
            style={styles.scrollView}
          >
            {_.map(this.props.targets, this._renderTarget)}
          </ScrollView>
        </View>


      </View>
    )
  }

}

module.exports = TargetCarousel;
