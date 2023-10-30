import { PREFIX_RDFS, SHAPES_GRAPH } from './constants'
import { Config } from './config'
import { findObjectValueByPredicate } from './util'

export function createShaclGroup(groupSubject: string, config: Config): HTMLElement {
    const group = document.createElement('div')
    group.dataset['subject'] = groupSubject
    group.classList.add('shacl-group')
    let name = groupSubject
    const quads = config.shapesGraph.getQuads(groupSubject, null, null, SHAPES_GRAPH)
    const label = findObjectValueByPredicate(quads, "label", PREFIX_RDFS, config.attributes.language)
    if (label) {
        name = label
    }
    const order = findObjectValueByPredicate(quads, "order")
    if (order) {
        group.style.order = order
    }
    const header = document.createElement('h2')
    header.innerText = name
    group.appendChild(header)
    return group
}
