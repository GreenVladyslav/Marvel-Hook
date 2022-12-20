import ErrorMessage from "../errorMessage/ErrorMessage"
import { Link } from "react-router-dom"
// import { useNavigate } from "react-router-dom";

const Page404 = () => {
    // const navigate = useNavigate();

    return (
        <div>
            <ErrorMessage/>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Page doesn't exist</p>
            {/* <button 
                style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'margin': '30px auto 0 auto', 'color': '#9f0013'}}
                onClick={() => navigate(-1)}
            >Go back</button> */}
            <Link style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px', 'color': '#9f0013'}} to="/">Back to main page</Link>
        </div>
    )
}

export default Page404;

// Link - чтобы вернутся на главную страницу (или можно сделать предыдущую страницу)