import React, { Component, Fragment } from 'react'
import OrgChart from '@balkangraph/orgchart.js/orgchart'


export default class extends Component {
  componentDidMount() {
    const clone = [...this.props.nodes]

    clone.forEach(item => {
      clone.forEach(val => {
        if (item.parent === val.name) {
          item.pid = val.id
        }
      })
    })

    OrgChart.templates.ana.name = '<foreignobject class="node" x="20" y="20" width="200" height="100" color="#fff" style="font-size: 14px;text-align:center">{val}</foreignobject>'

    OrgChart.templates.ana.couple = '<foreignobject class="node" x="20" y="70" width="200" height="100" color="#fff" style="font-size: 12px;text-align:center">({val})</foreignobject>'

    this.chart = new OrgChart(this.refs.tree, {
      template: "ana",
      nodes: clone,
      enableSearch: false,
      mouseScrool: OrgChart.action.none,
      nodeMouseClick: OrgChart.action.none,
      nodeBinding: {
        name: "name",
        couple: "couple"
      }
    })
  }

  onZoom = (flag) => {
    const scale = this.chart.getScale();
    if (flag === 'plus' && scale < 1) {
      this.chart.zoom(true, [20, 20], true);
    }

    if (flag === 'minus') {
      this.chart.zoom(false, [20, 20], true);
    }
  }

  render() {
    return (
      <Fragment>
        <div id="tree" ref="tree"></div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: 'rebeccapurple',
            borderRadius: '20px',
            color: 'white',
            fontSize: '25px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            cursor: 'pointer'
          }} onClick={() => this.onZoom('minus')}>-</div>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: 'rebeccapurple',
            borderRadius: '20px',
            color: 'white',
            fontSize: '25px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            cursor: 'pointer',
            marginLeft: '10px',
            marginRight: '10px'
          }} onClick={() => this.onZoom('plus')}>+</div>
        </div>
      </Fragment>
    )
  }
}