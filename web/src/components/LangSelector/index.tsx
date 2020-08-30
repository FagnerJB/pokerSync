import React, { useContext } from 'react'

import TableContext from '../../contexts/game'
import Text from '../../components/Text'
import { translate } from '../../localization'

const emoji = require('node-emoji')

const langList = [
    { key: "pt", title: "Portuguese", icon: emoji.get("flag-br") + emoji.get("flag-pt") },
    { key: "en", title: "English", icon: emoji.get("flag-us") + emoji.get("uk") },
    { key: "eo", title: "Esperanto", icon: <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAeCAYAAAC16ufeAAAC/0lEQVRYR+2YXUhTYRjH/+/ZkU2TZZsnT/Z1leUUuxBJImeYGkXkwixUugivvSgoQhGR7roQIlCELia6dELZICJISKH1gRFYaqOvC2dHY35Mnaw1tzfO2QdTVyT7cBd7OZyPh/f9P7/34fCc5zwE/qFUKlWNjY3Xqi/WXOV5fm/A/q/r3dd3cP9dx/9M3focJ7G5LTAum52tWMaCKEDEE8/zXK/hwZBGoynYimpMYf0gnjk6bje4yrGKnyIsazQOPC3Rais2glpXrMhOz4aMyMLuIR6wkmOBHZnXOyqIVltW2ddveEYIkaIcGGteN3SmKtwouonSfSe3FxaA4yGtIh2dnQad7kLdRprh6WHUP6lFYVYhBnWmsNGNW2QBuCe8/WTsw8dZjuOyRNg55xy+2D9jdGYUj78OwrJgkfbQkN+Agt1HUcQXgU/bAwWrkOzxhCUuZpEIM7NUdExB0fyyCd3jeuk+3FAr1HhUNYhDu3LiDitlgwCs+OClXrSYm6EPA8ylcTCeG8ARVW5wH/GM7CbYQIRL+k7g+9K3IBQBQc/ZXpQdOLUu4NsO66EeFBuO4Ydjeh2Y/kw3Kg+eTizYqZUplA+UIS8zT0pbrwQzusa6UJdbh7bjtxMLVlgV8Gl+UsqtLMNKcDanDcPWF6jJuZRYsGHTwF+M2/7OJjRsi+kWpSFpVfroUulYN/xmn83/8HbajPfC6Fb2F9Fcom5ShP8CRCQbm8VJ2NjEFUhGNhlZMQkls0GM3gOivp46DwVVxUg/arLkN7NIlDpFf4oGl6OmGiMh9ySMRH5Yfj69mphi5CNqstLfLYCUjCuK57L9KI2acpSFPFaM2Ht+Vfh6BTuQlVEvH5Jlkvwo+4lYbmNHxieohCq9OKVVnsfWIpVyEXuJVMBJbK6JtT7HG3dbsNfV3t5+T9QV60SxKcOkMRmEpTtlSibbC0qC9aJYOwZqyZB7cY1Ytol/xgxhfNVj6LxAvblpveQV8DeCvJSCIQQywtK1FbfgcdIluGAPZfsDKMpWZmfJCJMAAAAASUVORK5CYII=" className="flag-png" alt="Esperanto" /> }
]

function LangSelector() {

    const { lang, gameDispatch } = useContext(TableContext)

    return (

        <div className="lang-selector">
            <h6><Text s="Language" /></h6>
            {langList.map((langItem, i) =>
                <span key={`lang-${i}`} title={translate(langItem.title, lang)}>
                    <input id={`lang-${i}`} type="radio" name="lang" value={langItem.key}
                        checked={langItem.key === lang}
                        onChange={(e) => gameDispatch({ type: 'lang', payload: e.target.value })}
                    />
                    <label htmlFor={`lang-${i}`}
                        tabIndex={9}
                        role="button"
                        aria-pressed={langItem.key === lang}
                    ><i className="far fa-circle"></i> {langItem.icon}</label>
                </span>
            )}
        </div>
    )

}

export default LangSelector
