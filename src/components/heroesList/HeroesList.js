import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHeroes } from '../../reducers/heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';


const HeroesList = () => {

    const {filter} = useSelector(state => state.filters);
    const {heroes, heroesLoadingStatus} = useSelector(state => state.heroes);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchHeroes())
        // eslint-disable-next-line
    }, []);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem id={id} key={id} {...props}/>
        })
    }

    const heroFiltering = () => {
        switch(filter) {
            case 'Все':
                return heroes
            default:
                return heroes.filter(hero => hero.element === filter)
        }
    };

    const elements = renderHeroesList(heroFiltering());
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;