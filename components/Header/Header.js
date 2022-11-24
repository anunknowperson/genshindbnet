import { HeaderMenuColored } from "./HeaderMenuColored"
import attributes from './attributes.json';

const Header = () => (
    <HeaderMenuColored {...(attributes.props)}/>
);

export default Header;