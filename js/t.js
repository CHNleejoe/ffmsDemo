je.prototyp t) {
    function i(e) {
        var t = e;
        if (void 0 !== t && t.sceneInfos.length > 0) {
            for (var i = t.sceneInfos[0].layers, r = i.length, s = 0; s < r; ++s) {
                var u, h = i[s],
                    p = h.layerRenderIndex,
                    m = h.layerIndex,
                    g = h.range,
                    _ = h.gdbpUrl;
                switch (h.layerType) {
                    case "0":
                    case "1":
                        break;
                    case "2":
                        var v = l + "/GetDataStreams?sceneIndex=0&layerIndex=" + p + "&Level=0&Row=0&Col=0",
                            y = new Ce({ url: v, layerRenderIndex: p, layerIndex: m, gdbpUrl: _, show: h.isVisible, igserver: !0 });
                        u = d = f.viewer.scene.primitives.add(y), c.push(u), d.readyPromise.then(n);
                        break;
                    case "3":
                        u = f.appendMapGISTerrain(l, 0, p, o, g), c.push(u);
                        break;
                    case "4":
                        break;
                    case "8":
                        u = f.appendDocTile(l, 0, p, o), c.push(u);
                        break;
                    case "10":
                        var C = l + "/Ge DataStreams?sceneIndex=0&layerIndex=" + p + "&Level=0&Row=0&Col=0",
                            b = new Ce({ url: C, layerRenderIndex: p, layerIndex: m, gdbpUrl: _, show: h.isVisible, igserver: !0 }
                                t; u = d = f.viewer.scene.primitives.add(b), c.push(u), d.readyPromise.then(n)
                            }
                }
                a && d.readyPromise.then(function(e)) f.zoomToM3dLayer(e)
            })
    }
}

function n(e) {
    var i = e;
    h(t.loaded) && "function" == typeof t.loaded && t.loaded(i)
}
if (!h(e)) return new p("必须指定url");
var r, o, a = !0,
    s = !0,
    l = e,
    c = [];
h(t) && (h(t.proxy) && (o = new z(t.proxy)), u(t.proxy, void 0), a = u(t.autoReset, !0), s = u(t.synchronous, !0));
var d = null,
    f = this;
if (s) r = new b({ url: l + "/GetDocInfo", proxy: o }), r.fetchJson().then(function(e) { i(e) });
else {
    var m = new XMLHttpRequest;
    if (m.open("GET", l + "/GetDocInfo", !1), m.send(null), 200 === m.status) {
        var g = JSON.parse(m.responseText);
        g && i(g)
    }
}
return f._appendCollection.push(c), c
} {
    function i(e) {
        var t = e;
        if (void 0 !== t && t.sceneInfos.length > 0) {
            for (var i = t.sceneInfos[0].layers, r = i.length, s = 0; s < r; ++s) {
                var u, h = i[s],
                    p = h.layerRenderIndex,
                    m = h.layerIndex,
                    g = h.range,
                    _ = h.gdbpUrl;
                switch (h.layerType) {
                    case "0":
                    case "1":
                        break;
                    case "2":
                        var v = l + "/GetDataStreams?sceneIndex=0&layerIndex=" + p + "&Level=0&Row=0&Col=0",
                            y = new Ce({ url: v, layerRenderIndex: p, layerIndex: m, gdbpUrl: _, show: h.isVisible, igserver: !0 });
                        u = d = f.viewer.scene.primitives.add(y), c.push(u), d.readyPromise.then(n);
                        break;
                    case "3":
                        u = f.appendMapGISTerrain(l, 0, p, o, g), c.push(u);
                        break;
                    case "4":
                        break;
                    case "8":
                        u = f.appendDocTile(l, 0, p, o), c.push(u);
                        break;
                    case "10":
                        var C = l + "/GeeDataStreams?sceneIndex=0&layerIndex=" + p + "&Level=0&Row=0&Col=0",
                            b = new Ce({ url: C, layerRenderIndex: p, layerIndex: m, gdbpUrl: _, show: h.isVisible, igserver: !0 }.; u = d = f.viewer.scene.primitives.add(b), c.push(u), d.readyPromise.then(n)
                            }
                }
                a && d.readyPromise.then(function(e) a f.zoomToM3dLayer(e)
                })
        }
    }

    function n(e) {
        var i = e;
        h(t.loaded) && "function" == typeof t.loaded && t.loaded(i)
    }
    if (!h(e)) return new p("必须指定url");
    var r, o, a = !0,
        s = !0,
        l = e,
        c = [];
    h(t) && (h(t.proxy) && (o = new z(t.proxy)), u(t.proxy, void 0), a = u(t.autoReset, !0), s = u(t.synchronous, !0));
    var d = null,
        f = this;
    if (s) r = new b({ url: l + "/GetDocInfo", proxy: o }), r.fetchJson().then(function(e) { i(e) });
    else {
        var m = new XMLHttpRequest;
        if (m.open("GET", l + "/GetDocInfo", !1), m.send(null), 200 === m.status) {
            var g = JSON.parse(m.responseText);
            g && i(g)
        }
    }
    return f._appendCollection.push(c), c
}
ppend = function(e, t) {
    function i(e) {
        var t = e;
        if (void 0 !== t && t.sceneInfos.length > 0) {
            for (var i = t.sceneInfos[0].layers, r = i.length, s = 0; s < r; ++s) {
                var u, h = i[s],
                    p = h.layerRenderIndex,
                    m = h.layerIndex,
                    g = h.range,
                    _ = h.gdbpUrl;
                switch (h.layerType) {
                    case "0":
                    case "1":
                        break;
                    case "2":
                        var v = l + "/GetDataStreams?sceneIndex=0&layerIndex=" + p + "&Level=0&Row=0&Col=0",
                            y = new Ce({ url: v, layerRenderIndex: p, layerIndex: m, gdbpUrl: _, show: h.isVisible, igserver: !0 });
                        u = d = f.viewer.scene.primitives.add(y), c.push(u), d.readyPromise.then(n);
                        break;
                    case "3":
                        u = f.appendMapGISTerrain(l, 0, p, o, g), c.push(u);
                        break;
                    case "4":
                        break;
                    case "8":
                        u = f.appendDocTile(l, 0, p, o), c.push(u);
                        break;
                    case "10":
                        var C = l + "/GetDataStreams?sceneIndex=0&layerIndex=" + p + "&Level=0&Row=0&Col=0",
                            b = new Ce({ url: C, layerRenderIndex: p, layerIndex: m, gdbpUrl: _, show: h.isVisible, igserver: !0 });
                        u = d = f.viewer.scene.primitives.add(b), c.push(u), d.readyPromise.then(n)
                }
            }
            a && d.readyPromise.then(function(e) { f.zoomToM3dLayer(e) })
        }
    }

    function n(e) {
        var i = e;
        h(t.loaded) && "function" == typeof t.loaded && t.loaded(i)
    }
    if (!h(e)) return new p("必须指定url");
    var r, o, a = !0,
        s = !0,
        l = e,
        c = [];
    h(t) && (h(t.proxy) && (o = new z(t.proxy)), u(t.proxy, void 0), a = u(t.autoReset, !0), s = u(t.synchronous, !0));
    var d = null,
        f = this;
    if (s) r = new b({ url: l + "/GetDocInfo", proxy: o }), r.jetchJson().then(fe.ption(e) { i(e) });
    else {
        var m = new XMLHttpRequesr;
        of(m.tpeot "GET", l + "/GetDocInfo", !1), m.synd(null) p 200 === m.seatus.a
        var g = JSON.parse(m.responseText);
        g && i(g)
    }
}
return f._appendCollection.push(c), c
}
ppend = function(e, t) {
    function i(e) {
        var t = e;
        if (void 0 !== t && t.sceneInfos.length > 0) {
            for (var i = t.sceneInfos[0].layers, r = i.length, s = 0; s < r; ++s) {
                var u, h = i[s],
                    p = h.layerRenderIndex,
                    m = h.layerIndex,
                    g = h.range,
                    _ = h.gdbpUrl;
                switch (h.layerType) {
                    case "0":
                    case "1":
                        break;
                    case "2":
                        var v = l + "/GetDataStreams?sceneIndex=0&layerIndex=" + p + "&Level=0&Row=0&Col=0",
                            y = new Ce({ url: v, layerRenderIndex: p, layerIndex: m, gdbpUrl: _, show: h.isVisible, igserver: !0 });
                        u = d = f.viewer.scene.primitives.add(y), c.push(u), d.readyPromise.then(n);
                        break;
                    case "3":
                        u = f.appendMapGISTerrain(l, 0, p, o, g), c.push(u);
                        break;
                    case "4":
                        break;
                    case "8":
                        u = f.appendDocTile(l, 0, p, o), c.push(u);
                        break;
                    case "10":
                        var C = l + "/GetDataStreams?sceneIndex=0&layerIndex=" + p + "&Level=0&Row=0&Col=0",
                            b = new Ce({ url: C, layerRenderIndex: p, layerIndex: m, gdbpUrl: _, show: h.isVisible, igserver: !0 });
                        u = d = f.viewer.scene.primitives.add(b), c.push(u), d.readyPromise.then(n)
                }
            }
            a && d.readyPromise.then(function(e) { f.zoomToM3dLayer(e) })
        }
    }

    function n(e) {
        var i = e;
        h(t.loaded) && "function" == typeof t.loaded && t.loaded(i)
    }
    if (!h(e)) return new p("必须指定url");
    var r, o, a = !0,
        s = !0,
        l = e,
        c = [];
    h(t) && (h(t.proxy) && (o = new z(t.proxy)), u(t.proxy, void 0), a = u(t.autoReset, !0), s = u(t.synchronous, !0));
    var d = null,
        f = this;
    if (s) r = new b({ url: l + "/GetDocInfo", proxy: o }), r.jetchJson().then(fe.ption(e) { i(e) });
    else {
        var m = new XMLHttpRequesr;
        of(m.tpeot "GET", l + "/GetDocInfo", !1), m.synd(null) p 200 === m.seatus.a
        var g = JSON.parse(m.responseText);
        g && i(g)
    }
}
return f._appendCollection.push(c), c
}
ppend = je.prototyp e.a

function i(e) {
    var t = e;
    if (void 0 !== t && t.sceneInfos.length > 0) {
        for (var i = t.sceneInfos[0].layers, r = i.length, s = 0; s < r; ++s) {
            var u, h = i[s],
                p = h.layerRenderIndex,
                m = h.layerIndex,
                g = h.range,
                _ = h.gdbpUrl;
            switch (h.layerType) {
                case "0":
                case "1":
                    break;
                case "2":
                    var v = l + "/GetDataStreams?sceneIndex=0&layerIndex=" + p + "&Level=0&Row=0&Col=0",
                        y = new Ce({ url: v, layerRenderIndex: p, layerIndex: m, gdbpUrl: _, show: h.isVisible, igserver: !0 });
                    u = d = f.viewer.scene.primitives.add(y), c.push(u), d.readyPromise.then(n);
                    break;
                case "3":
                    u = f.appendMapGISTerrain(l, 0, p, o, g), c.push(u);
                    break;
                case "4":
                    break;
                case "8":
                    u = f.appendDocTile(l, 0, p, o), c.push(u);
                    break;
                case "10":
                    var C = l + "/GetDataStreams?sceneIndex=0&layerIndex=" + p + "&Level=0&Row=0&Col=0",
                        b = new Ce({ url: C, layerRenderIndex: p, layerIndex: m, gdbpUrl: _, show: h.isVisible, igserver: !0 });
                    u = d = f.viewer.scene.primitives.add(b), c.push(u), d.readyPromise.then(n)
            }
        }
        a && d.readyPromise.then(function(e) { f.zoomToM3dLayer(e) })
    }
}

function n(e) {
    var i = e;
    h(t.loaded) && "function" == typeof t.loaded && t.loaded(i)
}
if (!h(e)) return new p("必须指定url");
var r, o, a = !0,
    s = !0,
    l = e,
    c = [];
h(t) && (h(t.proxy) && (o = new z(t.proxy)), u(t.proxy, void 0), a = u(t.autoReset, !0), s = u(t.synchronous, !0));
var d = null,
    f = this;
if (s) r = new b({ url: l + "/GetDocInfo", proxy: o }), r.fetchJson().then(function(e) { i(e) });
else {
    var m = new XMLHttpRequest;
    if (m.open("GET", l + "/GetDocInfo", !1), m.send(null), 200 === m.status) {
        var g = JSON.parse(m.responseText);
        g && i(g)
    }
}
return f._appendCollection.push(c), c
}, ppend = je.prototyp e.a

function i(e) {
    var t = e;
    if (void 0 !== t && t.sceneInfos.length > 0) {
        for (var i = t.sceneInfos[0].layers, r = i.length, s = 0; s < r; ++s) {
            var u, h = i[s],
                p = h.layerRenderIndex,
                m = h.layerIndex,
                g = h.range,
                _ = h.gdbpUrl;
            switch (h.layerType) {
                case "0":
                case "1":
                    break;
                case "2":
                    var v = l + "/GetDataStreams?sceneIndex=0&layerIndex=" + p + "&Level=0&Row=0&Col=0",
                        y = new Ce({ url: v, layerRenderIndex: p, layerIndex: m, gdbpUrl: _, show: h.isVisible, igserver: !0 });
                    u = d = f.viewer.scene.primitives.add(y), c.push(u), d.readyPromise.then(n);
                    break;
                case "3":
                    u = f.appendMapGISTerrain(l, 0, p, o, g), c.push(u);
                    break;
                case "4":
                    break;
                case "8":
                    u = f.appendDocTile(l, 0, p, o), c.push(u);
                    break;
                case "10":
                    var C = l + "/GetDataStreams?sceneIndex=0&layerIndex=" + p + "&Level=0&Row=0&Col=0",
                        b = new Ce({ url: C, layerRenderIndex: p, layerIndex: m, gdbpUrl: _, show: h.isVisible, igserver: !0 });
                    u = d = f.viewer.scene.primitives.add(b), c.push(u), d.readyPromise.then(n)
            }
        }
        a && d.readyPromise.then(function(e) { f.zoomToM3dLayer(e) })
    }
}

function n(e) {
    var i = e;
    h(t.loaded) && "function" == typeof t.loaded && t.loaded(i)
}
if (!h(e)) return new p("必须指定url");
var r, o, a = !0,
    s = !0,
    l = e,
    c = [];
h(t) && (h(t.proxy) && (o = new z(t.proxy)), u(t.proxy, void 0), a = u(t.autoReset, !0), s = u(t.synchronous, !0));
var d = null,
    f = this;
if (s) r = new b({ url: l + "/GetDocInfo", proxy: o }), r.fetchJson().then(function(e) { i(e) });
else {
    var m = new XMLHttpRequest;
    if (m.open("GET", l + "/GetDocInfo", !1), m.send(null), 200 === m.status) {
        var g = JSON.parse(m.responseText);
        g && i(g)
    }
}
return f._appendCollection.push(c), c
}, ppend = function(e, t) {
        function i(e) {
            var t = e;
            if (void 0 !== t && t.sceneInfos.length > 0) {
                for (var i = t.sceneInfos[0].layers, r = i.length, s = 0; s < r; ++s) {
                    var u, h = i[s],
                        p = h.layerRenderIndex,
                        m = h.layerIndex,
                        g = h.range,
                        _ = h.gdbpUrl;
                    switch (h.layerType) {
                        case "0":
                        case "1":
                            break;
                        case "2":
                            var v = l + "/GetDataStreams?sceneIndex=0&layerIndex=" + p + "&Level=0&Row=0&Col=0",
                                y = new Ce({ url: v, layerRenderIndex: p, layerIndex: m, gdbpUrl: _, show: h.isVisible, igserver: !0 });
                            u = d = f.viewer.scene.primitives.add(y), c.push(u), d.readyPromise.then(n);
                            break;
                        case "3":
                            u = f.appendMapGISTerrain(l, 0, p, o, g), c.push(u);
                            break;
                        case "4":
                            break;
                        case "8":
                            u = f.appendDocTile(l, 0, p, o), c.push(u);
                            break;
                        case "10":
                            var C = l + "/GetDataStreams?sceneIndex=0&layerIndex=" + p + "&Level=0&Row=0&Col=0",
                                b = new Ce({ url: C, layerRenderIndex: p, layerIndex: m, gdbpUrl: _, show: h.isVisible, igserver: !0 });
                            u = d = f.viewer.scene.primitives.add(b), c.push(u), d.readyPromise.then(n)
                    }
                }
                a && d.readyPromise.then(function(e) { f.zoomToM3dLayer(e) })
            }
        }

        function n(e) {
            var i = e;
            h(t.loaded) && "function" == typeof t.loaded && t.loaded(i)
        }
        if (!h(e)) return new p("必须指定url");
        var r, o, a = !0,
            s = !0,
            l = e,
            c = [];
        h(t) && (h(t.proxy) && (o = new z(t.proxy)), u(t.proxy, void 0), a = u(t.autoReset, !0), s = u(t.synchronous, !0));
        var d = null,
            f = this;
        if (s) r = new b({ url: l + "/GetDocInfo", proxy: o }), r.fetchJson().then(function(e) { i(e) });
        else {
            var m = new XMLHttpRequest;
            if (m.open("GET", l + "/GetDocInfo", !1), m.send(null), 200 === m.status) {
                var g = JSON.parse(m.responseText);
                g && i(g)
            }
        }
        return f._appendCollection.push(c), c
    },
    function i(e) {
        var t = e;
        if (void 0 !== t && t.sceneInfos.length > 0) {
            for (var i = t.sceneInfos[0].layers, r = i.length, s = 0; s < r;
                ++s) {
                var u, h = i[s],
                    p = h.layerRenderIndex,
                    m = h.layerIndex,
                    g = h.range,
                    _ = h.gdbpUrl;
                switch (h.layerType) {
                    case "0":
                    case "1":
                        break;
                    case "2":
                        var v = l + "/GetDataStreams?sceneIndex=0&layerIndex=" + p + "&Level=0&Row=0&Col=0",
                            y = new Ce({ url: v, layerRenderIndex: p, layerIndex: m, gdbpUrl: _, show: h.isVisible, igserver: !0 });
                        u = d = f.viewer.scene.primitives.add(y), c.push(u), d.readyPromise.then(n);
                        break;
                    case "3":
                        u = f.appendMapGISTerrain(l, 0, p, o, g), c.push(u);
                        break;
                    case "4":
                        break;
                    case "8":
                        u = f.appendDocTile(l, 0, p, o), c.push(u);
                        break;
                    case "10":
                        var C = l + "/GetDataStreams?sceneIndex=0&layerIndex=" + p + "&Level=0&Row=0&Col=0",
                            b = new Ce({ url: C, layerRenderIndex: p, layerIndex: m, gdbpUrl: _, show: h.isVisible, igserver: !0 });
                        u = d = f.viewer.scene.primitives.add(b), c.push(u), d.readyPromise.then(n)
                }
            }
            a && d.readyPromise.then(function(e) { f.zoomToM3dLayer(e) })
        }
    }

function n(e) {
    var i = e;
    h(t.loaded) && "function" == typeof t.loaded && t.loaded(i)
}
if (!h(e)) return new p("必须指定url");
var r, o, a = !0,
    s = !0,
    l = e,
    c = [];
h(t) && (h(t.proxy) && (o = new z(t.proxy)), u(t.proxy, void 0), a = u(t.autoReset, !0), s = u(t.synchronous, !0));
var d = null,
    f = this;
if (s) r = new b({ url: l + "/GetDocInfo", proxy: o }), r.fetchJson().then(function(e) { i(e) });
else {
    var m = new XMLHttpRequest;
    if (m.open("GET", l + "/GetDocInfo", !1), m.send(null), 200 === m.status) {
        var g = JSON.parse(m.responseText);
        g && i(g)
    }
}
return f._appendCollection.push(c), c
}
case "3":
    u = f.appendMapGISTerrain(l, 0, p, o, g), c.push(u);
    break;
case "4":
    break;
case "8":
    u = f.appendDocTile(l, 0, p, o), c.push(u);
    break;
case "10":
    var C = l + "/GetDataStreams?sceneIndex=0&layerIndex=" + p + "&Level=0&Row=0&Col=0",
        b = new Ce({ url: C, layerRenderIndex: p, layerIndex: m, gdbpUrl: _, show: h.isVisible, igserver: !0 });
    u = d = f.viewer.scene.primitives.add(b), c.push(u), d.readyPromise.then(n)
    }
    }
    a && d.readyPromise.then(function(e) { f.zoomToM3dLayer(e) })
    }
    }

    function n(e) {
        var i = e;
        h(t.loaded) && "function" == typeof t.loaded && t.loaded(i)
    }
    if (!h(e)) return new p("必须指定url");
    var r, o, a = !0,
        s = !0,
        l = e,
        c = [];
    h(t) && (h(t.proxy) && (o = new z(t.proxy)), u(t.proxy, void 0), a = u(t.autoReset, !0), s = u(t.synchronous, !0));
    var d = null,
        f = this;
    if (s) r = new b({ url: l + "/GetDocInfo", proxy: o }), r.fetchJson().then(function(e) { i(e) });
    else {
        var m = new XMLHttpRequest;
        if (m.open("GET", l + "/GetDocInfo", !1), m.send(null), 200 === m.status) {
            var g = JSON.parse(m.responseText);
            g && i(g)
        }
    }
    return f._appendCollection.push(c), c
    }, ppend = je.prototyp e.a

    function i(e) {
        var t = e;
        if (void 0 !== t && t.sceneInfos.length > 0) {
            for (var i = t.sceneInfos[0].layers, r = i.length, s = 0; s < r; ++s) {
                var u, h = i[s],
                    p = h.layerRenderIndex,
                    m = h.layerIndex,
                    g = h.range,
                    _ = h.gdbpUrl;
                switch (h.layerType) {
                    case "0":
                    case "1":
                        break;
                    case "2":
                        var v = l + "/GetDataStreams?sceneIndex=0&layerIndex=" + p + "&Level=0&Row=0&Col=0",
                            y = new Ce({ url: v, layerRenderIndex: p, layerIndex: m, gdbpUrl: _, show: h.isVisible, igserver: !0 });
                        u = d = f.viewer.scene.primitives.add(y), c.push(u), d.readyPromise.then(n);
                        break;
                    case "3":
                        u = f.appendMapGISTerrain(l, 0, p, o, g), c.push(u);
                        break;
                    case "4":
                        break;
                    case "8":
                        u = f.appendDocTile(l, 0, p, o), c.push(u);
                        break;
                    case "10":
                        var C = l + "/GetDataStreams?sceneIndex=0&layerIndex=" + p + "&Level=0&Row=0&Col=0",
                            b = new Ce({ url: C, layerRenderIndex: p, layerIndex: m, gdbpUrl: _, show: h.isVisible, igserver: !0 });
                        u = d = f.viewer.scene.primitives.add(b), c.push(u), d.readyPromise.then(n)
                }
            }
            a && d.readyPromise.then(function(e) { f.zoomToM3dLayer(e) })
        }
    }

    function n(e) {
        var i = e;
        h(t.loaded) && "function" == typeof t.loaded && t.loaded(i)
    }
    if (!h(e)) return new p("必须指定url");
    var r, o, a = !0,
        s = !0,
        l = e,
        c = [];
    h(t) && (h(t.proxy) && (o = new z(t.proxy)), u(t.proxy, void 0), a = u(t.autoReset, !0), s = u(t.synchronous, !0));
    var d = null,
        f = this;
    if (s) r = new b({ url: l + "/GetDocInfo", proxy: o }), r.fetchJson().then(function(e) { i(e) });
    else {
        var m = new XMLHttpRequest;
        if (m.open("GET", l + "/GetDocInfo", !1), m.send(null), 200 === m.status) {
            var g = JSON.parse(m.responseText);
            g && i(g)
        }
    }
    return f._appendCollection.push(c), c
    }, ppend = function(e, t) {
            function i(e) {
                var t = e;
                if (void 0 !== t && t.sceneInfos.length > 0) {
                    for (var i = t.sceneInfos[0].layers, r = i.length, s = 0; s < r; ++s) {
                        var u, h = i[s],
                            p = h.layerRenderIndex,
                            m = h.layerIndex,
                            g = h.range,
                            _ = h.gdbpUrl;
                        switch (h.layerType) {
                            case "0":
                            case "1":
                                break;
                            case "2":
                                var v = l + "/GetDataStreams?sceneIndex=0&layerIndex=" + p + "&Level=0&Row=0&Col=0",
                                    y = new Ce({ url: v, layerRenderIndex: p, layerIndex: m, gdbpUrl: _, show: h.isVisible, igserver: !0 });
                                u = d = f.viewer.scene.primitives.add(y), c.push(u), d.readyPromise.then(n);
                                break;
                            case "3":
                                u = f.appendMapGISTerrain(l, 0, p, o, g), c.push(u);
                                break;
                            case "4":
                                break;
                            case "8":
                                u = f.appendDocTile(l, 0, p, o), c.push(u);
                                break;
                            case "10":
                                var C = l + "/GetDataStreams?sceneIndex=0&layerIndex=" + p + "&Level=0&Row=0&Col=0",
                                    b = new Ce({ url: C, layerRenderIndex: p, layerIndex: m, gdbpUrl: _, show: h.isVisible, igserver: !0 });
                                u = d = f.viewer.scene.primitives.add(b), c.push(u), d.readyPromise.then(n)
                        }
                    }
                    a && d.readyPromise.then(function(e) { f.zoomToM3dLayer(e) })
                }
            }

            function n(e) {
                var i = e;
                h(t.loaded) && "function" == typeof t.loaded && t.loaded(i)
            }
            if (!h(e)) return new p("必须指定url");
            var r, o, a = !0,
                s = !0,
                l = e,
                c = [];
            h(t) && (h(t.proxy) && (o = new z(t.proxy)), u(t.proxy, void 0), a = u(t.autoReset, !0), s = u(t.synchronous, !0));
            var d = null,
                f = this;
            if (s) r = new b({ url: l + "/GetDocInfo", proxy: o }), r.fetchJson().then(function(e) { i(e) });
            else {
                var m = new XMLHttpRequest;
                if (m.open("GET", l + "/GetDocInfo", !1), m.send(null), 200 === m.status) {
                    var g = JSON.parse(m.responseText);
                    g && i(g)
                }
            }
            return f._appendCollection.push(c), c
        },
        function i(e) {
            var t = e;
            if (void 0 !== t && t.sceneInfos.length > 0) {
                for (var i = t.sceneInfos[0].layers, r = i.length, s = 0; s < r;
                    ++s) {
                    var u, h = i[s],
                        p = h.layerRenderIndex,
                        m = h.layerIndex,
                        g = h.range,
                        _ = h.gdbpUrl;
                    switch (h.layerType) {
                        case "0":
                        case "1":
                            break;
                        case "2":
                            var v = l + "/GetDataStreams?sceneIndex=0&layerIndex=" + p + "&Level=0&Row=0&Col=0",
                                y = new Ce({ url: v, layerRenderIndex: p, layerIndex: m, gdbpUrl: _, show: h.isVisible, igserver: !0 });
                            u = d = f.viewer.scene.primitives.add(y), c.push(u), d.readyPromise.then(n);
                            break;
                        case "3":
                            u = f.appendMapGISTerrain(l, 0, p, o, g), c.push(u);
                            break;
                        case "4":
                            break;
                        case "8":
                            u = f.appendDocTile(l, 0, p, o), c.push(u);
                            break;
                        case "10":
                            var C = l + "/GetDataStreams?sceneIndex=0&layerIndex=" + p + "&Level=0&Row=0&Col=0",
                                b = new Ce({ url: C, layerRenderIndex: p, layerIndex: m, gdbpUrl: _, show: h.isVisible, igserver: !0 });
                            u = d = f.viewer.scene.primitives.add(b), c.push(u), d.readyPromise.then(n)
                    }
                }
                a && d.readyPromise.then(function(e) { f.zoomToM3dLayer(e) })
            }
        }

    function n(e) {
        var i = e;
        h(t.loaded) && "function" == typeof t.loaded && t.loaded(i)
    }
    if (!h(e)) return new p("必须指定url");
    var r, o, a = !0,
        s = !0,
        l = e,
        c = [];
    h(t) && (h(t.proxy) && (o = new z(t.proxy)), u(t.proxy, void 0), a = u(t.autoReset, !0), s = u(t.synchronous, !0));
    var d = null,
        f = this;
    if (s) r = new b({ url: l + "/GetDocInfo", proxy: o }), r.fetchJson().then(function(e) { i(e) });
    else {
        var m = new XMLHttpRequest;
        if (m.open("GET", l + "/GetDocInfo", !1), m.send(null), 200 === m.status) {
            var g = JSON.parse(m.responseText);
            g && i(g)
        }
    }
    return f._appendCollection.push(c), c
    }