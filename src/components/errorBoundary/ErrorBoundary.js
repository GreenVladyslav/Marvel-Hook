import { Component } from "react";

import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component {
    state = {
        error: false
    }

    // static getDerivedStateFromProps(error) {
    //     return {error: true}; /* просто меняет состояние */
    // }/* если надо что-то по круче то используем  componentDidCatch*/

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        return this.props.children; /* как бы компонент который был передан во внутрь компонента ErrorBoundary (типо его дети)*/
    }
}

export default ErrorBoundary;