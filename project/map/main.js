/**
 * Класс оверлея маски.
 * @class
 * @name MaskOverlay
 * @param {ymaps.geometry.pixel.Polygon} geometry Пиксельная геометкрия полигона.
 * @param {Object} data Данные.
 * @param {Object} options Опции.
 */
function MaskOverlay(geometry, data, options) {
    MaskOverlay.superclass.constructor.call(this, geometry, data, options);
}

ymaps.ready(function() {
    /**
     * @lends MaskOverlay.prototype
     */
    ymaps.util.augment(MaskOverlay, ymaps.overlay.staticGraphics.Polygon, {
        /**
         * @constructor
         */
        constructor: MaskOverlay,
        /**
         * Перекрываем публичный метод.
         * @function
         * @name MaskOverlay.setGeometry
         * @param {ymaps.geometry.pixel.Polygon} geometry Пиксельная геометрия полигона.
         */
        setGeometry: function(geometry) {
            MaskOverlay.superclass.setGeometry.call(
                this,
                this.getMap() ? this._createGeometry(geometry) : geometry
            );
        },
        /**
         * Создание пиксельной геометрии.
         * @function
         * @private
         * @name MaskOverlay._createGeometry
         * @returns {ymaps.geometry.pixel.Polygon} Пиксельная геометрия полигона.
         */
        _createGeometry: function(geometry) {
            var lineCoordinates = geometry.getCoordinates().slice(0),
                map = this.getMap(),
                center = map.getGlobalPixelCenter(),
                size = map.container.getSize(),
                d = 512;

            lineCoordinates.push([
                [center[0] - size[0] - d, center[1] - size[1] - d],
                [center[0] + size[0] + d, center[1] - size[1] - d],
                [center[0] + size[0] + d, center[1] + size[1] + d],
                [center[0] - size[0] - d, center[1] + size[1] + d],
                [center[0] - size[0] - d, center[1] - size[1] - d]
            ]);

            return new ymaps.geometry.pixel.Polygon(lineCoordinates, 'evenOdd');
        }
    });
});

/**
 * Класс-отображение списка регионов.
 * @class
 * @name RegionSelector.ListView
 * @param {jQuery} container Родительский элемент списка.
 */
RegionSelector.ListView = function(container) {
    this._container = container;
    this._template = '<li><a href="#">%s</a></li>';
    this._activeItem = null;
    this.events = $({});
};

/**
 * @lends RegionSelector.ListView.prototype
 */
RegionSelector.ListView.prototype = {
    /**
     * @constructor
     */
    constructor: RegionSelector.ListView,
    /**
     * Отображение данных в DOM-дереве.
     * @function
     * @name RegionSelector.ListView.render
     * @param {ymaps.data.Manager} data Данные регионов.
     * @returns {RegionSelector.ListView} Возвращает ссылку на себя.
     */
    render: function(data) {
        data.get('regions')
            .each(this._onEveryRegion, this);

        this._sortItems();
        this._attachHandlers();

        return this;
    },
    /**
     * Удаление данных из DOM-дерева.
     * @function
     * @name RegionSelector.ListView.clear
     * @returns {RegionSelector.ListView} Возвращает ссылку на себя.
     */
    clear: function() {
        this._detachHandlers();
        this._container.empty();

        return this;
    },
    /**
     * Сортировка DOM-элементов списка в алфавитном порядке.
     * @function
     * @private
     * @name RegionSelector.ListView._sortItems
     */
    _sortItems: function() {
        this._container.append(
            this._container.children().sort(function(a, b) {
                return $(a).find('a').text() > $(b).find('a').text() ? 1 : -1;
            })
        );
    },
    /**
     * Добавление обработчиков событий.
     * @function
     * @private
     * @name RegionSelector.ListView._attachHandlers
     */
    _attachHandlers: function() {
        this._container.on('click', 'li', $.proxy(this._onItemSelected, this));
    },
    /**
     * Удаление обработчиков событий.
     * @function
     * @private
     * @name RegionSelector.ListView._detachHandlers
     */
    _detachHandlers: function() {
        this._container.off('click');
    },
    /**
     * Обработчик клика на элементе списка.
     * @function
     * @private
     * @name RegionSelector.ListView._onItemSelected
     * @param {jQuery.Event} e Объект-событие.
     */
    _onItemSelected: function(e) {
        e.preventDefault();

        var index = $(e.currentTarget).data('index');

        this.unsetActiveItem()
            .setActiveItem(index);
        this.events.trigger($.Event('itemselected', {
            itemIndex: index
        }));
    },
    /**
     * Выделить элемент списка.
     * @function
     * @name RegionSelector.ListView.setActiveItem
     * @param {Number} index Порядковый номер элемента в списке.
     * @returns {RegionSelector.ListView} Возвращает ссылку на себя.
     */
    setActiveItem: function(index) {
        this._activeItem = this._findItem(index)
            .addClass('active');

        return this;
    },
    /**
     * Снять выделение элемента списка.
     * @function
     * @name RegionSelector.ListView.unsetActiveItem
     * @returns {RegionSelector.ListView} Возвращает ссылку на себя.
     */
    unsetActiveItem: function() {
        if (this._activeItem) {
            this._activeItem
                .removeClass('active');
            this._activeItem = null;
        }

        return this;
    },
    /**
     * Скроллим список к выбранному элементу.
     * @function
     * @name RegionSelector.ListView.scrollToItem
     * @param {Number} index Порядковый номер элемента в списке.
     * @returns {RegionSelector.ListView} Возвращает ссылку на себя.
     */
    scrollToItem: function(index) {
        var item = this._findItem(index),
            position = item.offset().top - this._container.offset().top;

        this._container.parent()
            .scrollTop(position);

        return this;
    },
    /**
     * Поиск (фильтрация) выбранного элемента в списке по индексу.
     * @function
     * @private
     * @name RegionSelector.ListView._findItem
     * @param {Number} index Порядковый номер элемента в списке.
     * @returns {RegionSelector.ListView} Возвращает ссылку на себя.
     */
    _findItem: function(index) {
        return this._container.children()
            .filter(function() {
                return $(this).data('index') == index;
            });
    },
    /**
     * Итератор по элементам геоколлекции.
     * @function
     * @private
     * @name RegionSelector.ListView._onEveryRegion
     * @param {ymaps.Polygon} region Геообъект региона.
     * @param {Number} index Порядковый номер элемента в геоколлекции.
     */
    _onEveryRegion: function(region, index) {
        this._container.append(
            $(
                this._template
                .replace('%s', region.properties.get('hintContent'))
            ).data('index', index)
        );
    }
};

/**
 * Класс-отображение данных на карте ввиде маски.
 * @class
 * @name RegionSelector.MapMaskView
 * @param {ymaps.Map} map Карта.
 */
RegionSelector.MapMaskView = function(map) {
    this._map = map;
    this._overlay = null;
    this._geometry = null;
};

/**
 * @lends RegionSelector.MapMaskView.prototype
 */
RegionSelector.MapMaskView.prototype = {
    /**
     * @constructor
     */
    constructor: RegionSelector.MapMaskView,
    /**
     * Отображение данных на карте.
     * @function
     * @name RegionSelector.MapMaskView.render
     * @param {ymaps.data.Manager} data Менеджер данных.
     * @returns {RegionSelector.MapMaskView} Возвращает ссылку на себя.
     */
    render: function(data) {
        var coordinates = [];

        data.get('regions')
            .each(function(geoObject) {
                coordinates.push.apply(coordinates, geoObject.geometry.getCoordinates());
            });

        this._createGeometry(coordinates);
        this._createOverlay(this._geometry.getPixelGeometry());
        this._attachHandlers();

        return this;
    },
    /**
     * Удаление данных с карты.
     * @function
     * @name RegionSelector.MapMaskView.clear
     * @returns {RegionSelector.MapMaskView} Возвращает ссылку на себя.
     */
    clear: function() {
        if (this._geometry) {
            this._detachHandlers();
            this._geometry.setMap(null);
            this._overlay.setMap(null);
        }
        this._geometry = this._overlay = null;

        return this;
    },
    /**
     * Добавление обработчиков событий.
     * @function
     * @private
     * @name RegionSelector.MapMaskView._attachHandlers
     */
    _attachHandlers: function() {
        this._geometry.events
            .add('pixelgeometrychange', this._onPixelGeometryChange, this);
        this._map.events
            .add('boundschange', this._onBoundsChange, this);
    },
    /**
     * Удаление обработчиков событий.
     * @function
     * @private
     * @name RegionSelector.MapMaskView._detachHandlers
     */
    _detachHandlers: function() {
        this._map.events
            .remove('boundschange', this._onBoundsChange, this);
        this._geometry.events
            .remove('pixelgeometrychange', this._onPixelGeometryChange, this);
    },
    /**
     * Обработчик события изменения пискельной геометрии.
     * @function
     * @private
     * @name RegionSelector.MapMaskView._onPixelGeometryChange
     * @param {ymaps.data.Manager} e Менеджер данных.
     */
    _onPixelGeometryChange: function(e) {
        this._createOverlay(e.get('newPixelGeometry'));
    },
    /**
     * Обработчик события смены центра/масштаба карты.
     * @function
     * @private
     * @name RegionSelector.MapMaskView._onBoundsChange
     */
    _onBoundsChange: function(e) {
        if (e.get('oldZoom') !== e.get('newZoom')) {
            this._createOverlay(this._geometry.getPixelGeometry());
        }
    },
    /**
     * Создание геометрии типа "Polygon".
     * @function
     * @private
     * @name RegionSelector.MapMaskView._createGeometry
     * @param {Number[][]} coordinates Координаты вершин ломаных, определяющих внешнюю и внутренние границы многоугольника.
     */
    _createGeometry: function(coordinates) {
        this._geometry = new ymaps.geometry.Polygon(coordinates, 'evenOdd', {
            projection: this._map.options.get('projection')
        });
        this._geometry.setMap(this._map);
    },
    /**
     * Создание оверлея.
     * @function
     * @private
     * @name RegionSelector.MapMaskView._createOverlay
     * @param {ymaps.geometry.pixel.Polygon} geometry Пиксельная геометрия полигона.
     */
    _createOverlay: function(geometry) {
        if (!this._overlay) {
            this._overlay = new MaskOverlay(geometry, null, this.getDefaults());
        }
        this._overlay.setMap(this._map);
        this._overlay.setGeometry(geometry);
    },
    /**
     * Опции по-умолчанию.
     * @function
     * @name RegionSelector.MapMaskView.getDefaults
     * @returns {Object} Опции.
     */
    getDefaults: function() {
        return {
            zIndex: 1,
            stroke: false,
            strokeColor: false,
            fillColor: 'CCC'
        };
    }
};

/**
 * Класс-отображение регионов на карте.
 * @class
 * @name RegionSelector.MapView
 * @param {ymaps.Map} map Карта.
 */
RegionSelector.MapView = function(map) {
    this._map = map;
    this._regions = null;
    this._activeItem = null;
    this.events = new ymaps.event.Manager();
};

/**
 * @lends RegionSelector.MapView.prototype
 */
RegionSelector.MapView.prototype = {
    /**
     * @constuctor
     */
    constructor: RegionSelector.MapView,
    /**
     * Добавление обработчиков событий.
     * @function
     * @private
     * @name RegionSelector.MapView._attachHandlers
     */
    _attachHandlers: function() {
        this._regions.events.add('click', this._onClick, this);
        this._regions.events.add('mouseenter', this._onMouseEnter, this);
    },
    /**
     * Удаление обработчиков событий.
     * @function
     * @private
     * @name RegionSelector.MapView._detachHandlers
     */
    _detachHandlers: function() {
        this._regions.events.remove('mouseenter', this._onMouseEnter, this);
        this._regions.events.remove('click', this._onClick, this);
    },
    /**
     * Обработчик клика на области региона.
     * @function
     * @private
     * @name RegionSelector.MapView._onClick
     * @param {ymaps.data.Manager} e Менеджер данных.
     */
    _onClick: function(e) {
        var region = e.get('target'),
            index = this._regions.indexOf(region);

        this
            .unsetActiveItem()
            .setActiveItem(index);

        this.events.fire('itemselected', {
            index: index
        });
    },
    /**
     * Отображение данных на карте.
     * @function
     * @name RegionSelector.MapView.render
     * @param {ymaps.data.Manager} data Менеджер данных.
     * @returns {RegionSelector.MapView} Возвращает ссылку на себя.
     */
    render: function(data) {
        this._map.geoObjects.add(
            this._regions = data.get('regions')
        );
        this.setFocusOnRegions();
        this._regions.options.set({
            zIndex: 1,
            zIndexHover: 1,
            fillColor: RegionSelector.MapView.COLOR,
            strokeColor: RegionSelector.MapView.COLOR,
            strokeWidth: 1
        });
        this._attachHandlers();

        return this;
    },
    /**
     * Удаление данных с карты.
     * @function
     * @name RegionSelector.MapView.clear
     * @returns {RegionSelector.MapView} Возвращает ссылку на себя.
     */
    clear: function() {
        if (this._regions) {
            this._detachHandlers();
            this._map.geoObjects.remove(this._regions);
            this._regions = null;
            this._activeItem = null;
        }

        return this;
    },
    /**
     * Выделяем активный регион.
     * @function
     * @name RegionSelector.MapView.setActiveItem
     * @param {Number} index Индекс региона в коллекции.
     * @returns {RegionSelector.MapView} Возвращает ссылку на себя.
     */
    setActiveItem: function(index) {
        var region = this._activeItem = this._regions.get(index);

        region.options.set({
            fillColor: RegionSelector.MapView.SELECTED_COLOR,
            strokeColor: RegionSelector.MapView.SELECTED_COLOR
        });

        return this;
    },
    /**
     * Снимаем выделение активного региона.
     * @function
     * @name RegionSelector.MapView.unsetActiveItem
     * @returns {RegionSelector.MapView} Возвращает ссылку на себя.
     */
    unsetActiveItem: function() {
        if (this._activeItem) {
            this._activeItem.options.set({
                fillColor: RegionSelector.MapView.COLOR,
                strokeColor: RegionSelector.MapView.COLOR
            });
            this._activeItem = null;
        }

        return this;
    },
    /**
     * Выставляем карте область видимости на определенный регион.
     * @function
     * @name RegionSelector.MapView.setFocusOnRegion
     * @param {Number} index Порядковый номер региона в геоколлекции.
     * @returns {RegionSelector.MapView} Возвращает ссылку на себя.
     */
    setFocusOnRegion: function(index) {
        this._map.setBounds(
            this._regions.get(index).geometry.getBounds(), {
                checkZoomRange: true
                    //, duration: 1000
            }
        );

        return this;
    },
    /**
     * Выставляем карте область видимости по всем регионам.
     * @function
     * @name RegionSelector.MapView.setFocusOnRegions
     * @returns {RegionSelector.MapView} Возвращает ссылку на себя.
     */
    setFocusOnRegions: function() {
        this._map.options.set('restrictMapArea', false);

        this._map.setBounds(this._regions.getBounds(), {
            callback: ymaps.util.bind(function() {
                this._map.options.set('restrictMapArea', this._map.getBounds())
            }, this)
        });

        return this;
    }
};

/**
 * Цвет областей региона.
 * @static
 * @constant
 */
RegionSelector.MapView.COLOR = 'rgba(0,102,255,0.6)';
/**
 * Цвет выделенной области.
 * @static
 * @constant
 */
RegionSelector.MapView.SELECTED_COLOR = 'rgba(255,153,153,1)';

/**
 * Класс-отображения контролов настроек.
 * @class
 * @name RegionSelector.OptsView
 * @param {jQuery} container Родительский элемент контролов настроек.
 */
RegionSelector.OptsView = function(container) {
    this._container = container;
    this._btnTemplate = [
        '<div class="btn-group">',
        '<a class="btn btn-primary dropdown-toggle" data-toggle="dropdown" href="#">',
        '%s',
        '&nbsp;<span class="caret"></span>',
        '</a>',
        '<ul class="dropdown-menu"></ul>',
        '</div>'
    ].join('');
    this._itemTemplate = '<li><a href="#">%s</a></li>';
    this._activeIconTemplate = '<i class="icon-ok"></i>';
    this.events = $({});
};

/**
 * @lends RegionSelector.OptsView.prototype
 */
RegionSelector.OptsView.prototype = {
    /**
     * @constructor
     */
    constructor: RegionSelector.OptsView,
    /**
     * Отображение контролов настроек в DOM-дереве.
     * @function
     * @name RegionSelector.OptsView.render
     * @param {ymaps.data.Manager} data Менеджер данных.
     * @returns {RegionSelector.OptsView} Возвращает ссылку на себя.
     */
    render: function(data) {
        var labels = this.constructor.LABELS,
            options = data.get('regions').properties.getAll();

        for (var key in labels) {
            var option = key === 'lang' ? // Хак для списка доступных языков.
                labels[key][options.country] :
                labels[key],
                btn = $(
                    this._btnTemplate
                    .replace('%s', option.label)
                );

            for (var value in option.values) {
                var label = option.values[value],
                    item = $(
                        this._itemTemplate
                        .replace('%s', label)
                    )
                    .data(key, value);

                if (options[key] == value) {
                    item.find('a')
                        .prepend(this._activeIconTemplate);
                }

                btn.find('ul')
                    .append(item);
            }
            this._container
                .append(btn);
        }

        this._attachHandlers();

        return this;
    },
    /**
     * Удаление контролов настроек из DOM-дерева.
     * @function
     * @name RegionSelector.OptsView.clear
     * @returns {RegionSelector.OptsView} Возвращает ссылку на себя.
     */
    clear: function() {
        this._detachHandlers();
        this._container.empty();

        return this;
    },
    /**
     * Добавление обработчиков событий.
     * @function
     * @private
     * @name RegionSelector.OptsView._attachHandlers
     */
    _attachHandlers: function() {
        this._container.on('click', 'li', $.proxy(this._onItemClick, this));
    },
    /**
     * Удаление обработчиков событий.
     * @function
     * @private
     * @name RegionSelector.OptsView._detachHandlers
     */
    _detachHandlers: function() {
        this._container.off();
    },
    /**
     * Обработчик клика на конроле настроек.
     * @function
     * @name RegionSelector.OptsView._onItemClick
     * @param {jQuery.Event} e Объект-событие.
     */
    _onItemClick: function(e) {
        e.preventDefault();

        var item = $(e.currentTarget);

        this.unsetActiveItem(item.parent())
            .setActiveItem(item);

        this.events.trigger($.Event('optionschange', {
            options: item.data()
        }));
    },
    /**
     * Выделить элемент списка контрола.
     * @function
     * @name RegionSelector.OptsView.setActiveItem
     * @param {jQuery} item Элемент списка контрола.
     * @returns {RegionSelector.OptsView} Возвращает ссылку на себя.
     */
    setActiveItem: function(item) {
        item.find('a')
            .prepend($(this._activeIconTemplate));

        return this;
    },
    /**
     * Снять выделение элемента списка контрола.
     * @function
     * @name RegionSelector.OptsView.unsetActiveItem
     * @param {jQuery} container Родительский элемент.
     * @returns {RegionSelector.OptsView} Возвращает ссылку на себя.
     */
    unsetActiveItem: function(container) {
        container.find('.icon-ok')
            .remove();

        return this;
    }
};

/**
 * Заголовки контролов.
 * @static
 * @constant
 */
RegionSelector.OptsView.LABELS = {
    country: {
        label: 'Страна',
        values: {
            RU: 'Россия',
            UA: 'Украина',
            BY: 'Белоруссия',
            KZ: 'Казахстан'
        }
    },
    lang: {
        label: 'Язык',
        RU: {
            label: 'Язык',
            values: {
                ru: 'русский'
            }
        },
        UA: {
            label: 'Язык',
            values: {
                uk: 'украинский',
                ru: 'русский'
            }
        },
        BY: {
            label: 'Язык',
            values: {
                be: 'белорусский',
                ru: 'русский'
            }
        },
        KZ: {
            label: 'Язык',
            values: {
                ru: 'русский'
            }
        }
    },
    quality: {
        label: 'Уровень качества',
        values: [
            'низкий',
            'средний',
            'высокий',
            'максимальный'
        ]
    }
};

/**
 * Класс-отображение заголовка.
 * @class
 * @name RegionSelector.TitleView
 * @param {jQuery} container Родителький элемент контрола.
 */
RegionSelector.TitleView = function(container) {
    this._container = container;
    this._template = '<p><a href="#">%s</a></p>';
    this.events = $({});
};

/**
 * @lends RegionSelector.TitleView.prototype
 */
RegionSelector.TitleView.prototype = {
    /**
     * @constructor
     */
    constructor: RegionSelector.TitleView,
    /**
     * Отображение данных в DOM-дереве.
     * @function
     * @name RegionSelector.TitleView.render
     * @param {ymaps.data.Manager} data Данные регионов.
     * @returns {RegionSelector.TitleView} Возвращает ссылку на себя.
     */
    render: function(data) {
        var title = data.get('regions').properties.get('hintContent');

        this._container
            .append(this._template.replace('%s', title));
        this._attachHandlers();

        return this;
    },
    /**
     * Удаление данных из DOM-дерева.
     * @function
     * @name RegionSelector.TitleView.clear
     * @returns {RegionSelector.TitleView} Возвращает ссылку на себя.
     */
    clear: function() {
        this._detachHandlers();
        this._container.empty();

        return this;
    },
    /**
     * Добавление обработчиков событий.
     * @function
     * @private
     * @name RegionSelector.TitleView._attachHandlers
     */
    _attachHandlers: function() {
        this._container.on('click', 'a', $.proxy(this._onTitleClick, this));
    },
    /**
     * Удаление обработчиков событий.
     * @function
     * @private
     * @name RegionSelector.TitleView._detachHandlers
     */
    _detachHandlers: function() {
        this._container.off('click');
    },
    /**
     * Обработчик клика на заголовке.
     * @function
     * @private
     * @name RegionSelector.TitleView._onTitleClick
     * @param {jQuery.Event} e Объект-событие.
     */
    _onTitleClick: function(e) {
        e.preventDefault();

        this.events.trigger($.Event('titleclick'));
    }
};

/**
 * Класс-контрол выбора региона
 * @class
 * @name RegionSelector
 * @param {ymaps.Map} map Карта.
 * @param {jQuery} listContainer Контейнер списка областей.
 * @param {jQuery} optContainer Контейнер для настроек.
 * @param {jQuery} titleContainer Контейнер заголовка.
 */
function RegionSelector(map, listContainer, optContainer, titleContainer) {
    this._model = new RegionSelector.Model();
    this._views = [
        this._listView = new RegionSelector.ListView(listContainer),
        this._optsView = new RegionSelector.OptsView(optContainer),
        this._titleView = new RegionSelector.TitleView(titleContainer),
        this._mapView = new RegionSelector.MapView(map),
        this._mapMaskView = new RegionSelector.MapMaskView(map)
    ];

    this._attachHandlers();
    this._model.load();
}

/**
 * @lends RegionSelector.prototype
 */
RegionSelector.prototype = {
    /**
     * @constructor
     */
    constructor: RegionSelector,
    /**
     * Добавление обработчиков событий.
     * @function
     * @private
     * @name RegionSelector._attachHandlers
     */
    _attachHandlers: function() {
        this._model.events.add('load', this._onRegionsLoaded, this);
        this._mapView.events.add('itemselected', this._onMapItemSelected, this);
        this._listView.events.on('itemselected', $.proxy(this._onListItemSelected, this));
        this._optsView.events.on('optionschange', $.proxy(this._onOptionsChange, this));
        this._titleView.events.on('titleclick', $.proxy(this._onTitleClick, this));
    },
    /**
     * Удаление обработчиков событий.
     * @function
     * @private
     * @name RegionSelector._detachHandlers
     */
    _detachHandlers: function() {
        this._titleView.events.off();
        this._optsView.events.off();
        this._listView.events.off();
        this._mapView.events.remove('regionselected', this._onRegionSelected, this);
        this._model.events.remove('load', this._onRegionsLoaded, this);
    },
    /**
     * Обработчик события загрузки данных о регионах.
     * @function
     * @private
     * @name RegionSelector._onRegionsLoaded
     * @param {ymaps.data.Manager} data Менеджер данных.
     */
    _onRegionsLoaded: function(data) {
        for (var i = 0, len = this._views.length; i < len; i++) {
            this._views[i]
                .clear()
                .render(data);
        }
    },
    /**
     * Обработчик выбора региона на карте.
     * @function
     * @private
     * @name RegionSelector._onMapItemSelected
     * @param {ymaps.data.Manager} e Менеджер данных.
     */
    _onMapItemSelected: function(e) {
        var index = e.get('index');

        this._listView
            .unsetActiveItem()
            .setActiveItem(index)
            .scrollToItem(index);
    },
    /**
     * Обработчик выбора региона в списке.
     * @function
     * @private
     * @name RegionSelector._onListItemSelected
     * @param {jQuery.Event} e Объект-событие.
     */
    _onListItemSelected: function(e) {
        var index = e.itemIndex;

        this._mapView
            .unsetActiveItem()
            .setActiveItem(index)
            .setFocusOnRegion(index);
    },
    _onTitleClick: function(e) {
        this._mapView
            .unsetActiveItem()
            .setFocusOnRegions();

        this._listView
            .unsetActiveItem();
    },
    /**
     * Обработчик смены настроек.
     * @function
     * @private
     * @name RegionSelector._onOptionsChange
     * @param {jQuery.Event} e Объект-событие.
     */
    _onOptionsChange: function(e) {
        this._model.options.set(e.options);
    }
};