import { useDispatch } from "react-redux";
import { heroDeleted } from "../heroesList/heroesSlice";
import { useHttp } from "../../hooks/http.hook";

const HeroesListItem = ({name, description, element, id}) => {

    const {request} = useHttp();
    const dispatch = useDispatch();


    let elementClassName;

    switch (element) {
        case 'Огонь':
            elementClassName = 'bg-danger bg-gradient';
            break;
        case 'Вода':
            elementClassName = 'bg-primary bg-gradient';
            break;
        case 'Ветер':
            elementClassName = 'bg-success bg-gradient';
            break;
        case 'Земля':
            elementClassName = 'bg-secondary bg-gradient';
            break;
        default:
            elementClassName = 'bg-warning bg-gradient';
    }

    const removeHeroFromServer = (id) => {
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
        .then(res => {
            dispatch(heroDeleted(id))
        })
        .catch(() => {
            throw new Error('Fetching error')
        });
    }

    return (
        <li 
            className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}>
            <img src="http://www.stpaulsteinbach.org/wp-content/uploads/2014/09/unknown-hero.jpg" 
                 className="img-fluid w-25 d-inline" 
                 alt="unknown hero" 
                 style={{'objectFit': 'cover'}}/>
            <div className="card-body">
                
                <h3 className="card-title">{name}</h3>
                <p className="card-text">{description}</p>
            </div>
            <span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
                <button onClick={() => removeHeroFromServer(id)} type="button" className="btn-close btn-close" aria-label="Close"></button>
            </span>
        </li>
    )
}

export default HeroesListItem;