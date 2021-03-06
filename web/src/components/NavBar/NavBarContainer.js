import { connect } from 'react-redux'
import NavBar from './NavBar'

import { logOutUser } from 'adaptive-common/reducers/Login/logOutUser'
import { getUser } from 'adaptive-common/selectors'

const mapStateToProps = (state, ownProps) => {
  return {
    isVisitor: state.login.isVisitor,
    user: getUser(state),
    missions: state.mission ? state.mission.missions : null
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: data => dispatch(logOutUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
