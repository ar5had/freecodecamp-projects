
var Person = function(firstAndLast) {

    var name = firstAndLast.split(" ");
    this.getFullName = function(){ return name.join(" ");};
    this.getFirstName = function(){ return name[0];};
    this.getLastName = function(){ return name[1];};
    this.setFirstName = function(first){ name[0] = first;};
    this.setLastName = function(last){ name[1] = last;};
    this.setFullName = function(full){ full = full.split(" ");
                                       name[0] = full[0];
                                       name[1] = full[1];
                                     };
    return firstAndLast;
};

var bob = new Person('Bob Ross');
bob.getFullName();
