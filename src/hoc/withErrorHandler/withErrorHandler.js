import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        // 
        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            //1 arg = response, 2 arg = error
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        // 212. Remove Interceptors 
        // To avoid leak memory remove the interceptors when this component gets unmounted
        // In other words, remove interceptors when this specific instance of our
        // withErrorHandler wrapper is not needed anymore.
        // If we reuse withErrorHandler in out app, we don't create more and more 
        // interceptors with the old ones living on.
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHanlder = () => {
            this.setState({error:null});
        }

        render () {
            return (
                <>
                    <Modal 
                    show={this.state.error}
                    modalClosed={this.errorConfirmedHanlder}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </>  
            );
        }
    }
}

export default withErrorHandler;