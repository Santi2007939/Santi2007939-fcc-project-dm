const Logo = (props) => {
    return (
        <div className='logo'>
            <img src={props.img} className={props.logoClass}/>
        </div>
    )
}

export default Logo;