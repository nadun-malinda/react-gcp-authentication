import Navigation from './Navigation'
import classes from './Layout.module.css'

const Layout = (props) => {
    return (
        <div className={classes.layout}>
            <Navigation />
            <main>{props.children}</main>
        </div>
    )
}

export default Layout