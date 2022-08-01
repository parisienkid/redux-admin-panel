import { v4 } from "uuid";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { heroCreated } from "../heroesList/heroesSlice";
import { useHttp } from "../../hooks/http.hook";

const HeroesAddForm = () => {

    const [hero, setHero] = useState({
        id: '',
        name: "",
        description: "",
        element: "Огонь"
    });

    const {request} = useHttp();
    const dispatch = useDispatch();

    const handleNewHeroValue = (event) => {
        const name = event.target.getAttribute('name');
        let newHero = {...hero};
        newHero[name] = event.target.value;
        setHero(newHero);
    };

    const setNewHero = () => {
        const id = v4();
        let newHero = {...hero, id: id};
        setHero(newHero);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        request('http://localhost:3001/heroes', 'POST', JSON.stringify(hero))
        .then(res => {
            dispatch(heroCreated(hero))
        })
        .catch(() => {
            throw new Error('Fetching error')
        });
    };


    return (
        <form onSubmit={onSubmit} className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    onChange={handleNewHeroValue}
                    value={hero.name}
                    />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="description" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    value={hero.description}
                    onChange={handleNewHeroValue}
                    />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={hero.element}
                    onChange={handleNewHeroValue}
                    >
                    <option value="Огонь">Огонь</option>
                    <option value="Вода">Вода</option>
                    <option value="Ветер">Ветер</option>
                    <option value="Земля">Земля</option>
                </select>
            </div>

            <button type="submit" onClick={setNewHero} className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;