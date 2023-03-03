#include <iostream>
#include <iomanip>
#include <string>

using namespace std;

// Class declaration for NutritionData
class NutritionData {
  private:
    string foodName; // name of the food
    int servingSize; // serving size in grams
    double calFromCarb; // calories from carbohydrates
    double calFromFat; // calories from fat
    double calFromProtein; // calories from protein

  public:
// Default constructor
    NutritionData() : foodName(""), servingSize(0), calFromCarb(0.0), calFromFat(0.0), calFromProtein(0.0) {}


// Mutator member functions
  void setFoodName(string name) {
    foodName = name;
  }

  void setServingSize(int size) {
    servingSize = size;
  }

  void setCalFromCarb(double cal) {
    calFromCarb = cal;
  }

  void setCalFromFat(double cal) {
    calFromFat = cal;
  }

  void setCalFromProtein(double cal) {
    calFromProtein = cal;
  }

  string getFoodName() const {
    return foodName;
  }

  int getServingSize() const {
    return servingSize;
  }

  double getCalFromCarb() const {
    return calFromCarb;
  }

  double getCalFromFat() const {
    return calFromFat;
  }

  double getCalFromProtein() const {
    return calFromProtein;
  }

  // Special accessor member function
  double getCaloriesPerServing() const {
    return calFromCarb + calFromFat + calFromProtein;
  }
};

// Function definition for printNutritionData
void printNutritionData(const NutritionData& data) {
  cout << "Food Name: " << data.getFoodName() << endl;
  cout << "Serving Size: " << data.getServingSize() << " grams" << endl;
  cout << "Calories Per Serving: " << fixed << setprecision(1) << data.getCaloriesPerServing() << endl;
  cout << "Calories From Carb: " << fixed << setprecision(1) << data.getCalFromCarb() << endl;
  cout << "Calories From Fat: " << fixed << setprecision(1) << data.getCalFromFat() << endl;
  cout << "Calories From Protein: " << fixed << setprecision(1) << data.getCalFromProtein() << endl;
}

int main() {
  // Create instance of NutritionData named pita
  NutritionData pita;

  // Set nutrition data for pita
  pita.setFoodName("Bread pita whole wheat");
  pita.setServingSize(64);
  pita.setCalFromCarb(134.0);
  pita.setCalFromFat(14.0);
  pita.setCalFromProtein(22.6);

  // Print the nutrition data of pita
  printNutritionData(pita);

return 0;
}