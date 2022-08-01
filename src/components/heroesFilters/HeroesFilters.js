import  {fetchFiltres, changeFilterStatus} from '../../actions';
import { useEffect} from 'react';
import { useHttp } from '../../hooks/http.hook';
import { useSelector, useDispatch } from 'react-redux';
import { v4 } from 'uuid';

const HeroesFilters = () => {

    const {request} = useHttp();
    const dispatch = useDispatch();
    const {filters, filter} = useSelector(state => state.filters);

    useEffect(() => {
        dispatch(fetchFiltres(request));
    }, []);


    const btnFilterClass = (filterName) => {
        switch(filterName) {
            case 'Все':
                return 'btn btn-outline-dark'
            case 'Огонь':
                return 'btn btn-danger'
            case 'Вода':
                return 'btn btn-primary'
            case 'Ветер':
                return 'btn btn-success'
            case 'Земля':
                return 'btn btn-secondary'
            default:
                return null
        }
    };

    const btnActiveClass = (activeFilter, filter) => {
       return activeFilter === filter ? ' active' : ''
    }   

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {
                        filters.length > 0
                        ?
                        filters.map(item => {
                            return <button key={v4()} onClick={() => dispatch(changeFilterStatus(item))}  className={`${btnFilterClass(item)}${ btnActiveClass(filter, item)}`}>{item}</button>
                        })
                        :
                        null
                    }
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;