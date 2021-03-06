import Ember from 'ember';
import Util from 'ember-cli-pagination/util';
import TruncatePages from './truncate-pages';
import SafeGet from '../util/safe-get';

export default Ember.Object.extend(SafeGet, {
  pageItemsAll: function() {
    var currentPage = this.getInt("currentPage");
    var totalPages = this.getInt("totalPages");
    Util.log("PageNumbers#pageItems, currentPage " + currentPage + ", totalPages " + totalPages);

    var res = [];
    
    for(var i=1; i<=totalPages; i++) {
      res.push({
        page: i,
        current: currentPage === i,
        dots: false
      });
    }
    return res;
  }.property("currentPage", "totalPages"),

  pageItemsTruncated: function() {
    var currentPage = this.getInt('currentPage');
    var totalPages = this.getInt("totalPages");
    var toShow = this.getInt('numPagesToShow');
    var showFL = this.get('showFL');

    var t = TruncatePages.create({currentPage: currentPage, totalPages: totalPages, 
                                  numPagesToShow: toShow,
                                  showFL: showFL});
    var pages = t.get('pagesToShow');
    var next = pages[0];
    
    return pages.map(function(page) {
      var h = {
        page: page,
        current: (currentPage === page),
        dots: (next !== page)
      };
      next = page + 1;
      return h;
    });
  }.property('currentPage','totalPages','numPagesToShow','showFL'),

  pageItems: function() {
    if (this.get('truncatePages')) {
      return this.get('pageItemsTruncated');
    }
    else {
      return this.get('pageItemsAll');
    }
  }.property('currentPage','totalPages','truncatePages','numPagesToShow')
});