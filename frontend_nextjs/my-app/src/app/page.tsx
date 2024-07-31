"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Translate from "@/components/core/translate/translate";

// Define type for dropdown options
type DropdownOption = {
  value: string;
  label: string;
};

// Define type for dropdown options by dropdown
type DropdownOptions = {
  dropdown1: DropdownOption[];
  dropdown2: DropdownOption[];
  dropdown3: DropdownOption[];
  dropdown4: DropdownOption[];
};

// Define type for selected values
type SelectedValues = {
  dropdown1: string;
  dropdown2: string;
  dropdown3: string;
  dropdown4: string;
};

// Define labels for each dropdown
const dropdownLabels = [
  "Mutual Fund",  // For dropdown1
  "Stock Market (India)", // For dropdown2
  "Stock Market (USA)", // For dropdown3
  "Fixed Deposit"  // For dropdown4
];

const dropdownOptions: DropdownOptions = {
  dropdown1: [
    { value: "example", label: "example" }
  ],
  dropdown2: [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4" },
    { value: "option5", label: "Option 5" },
  ],
  dropdown3: [
    { value: "optionA", label: "Option A" },
    { value: "optionB", label: "Option B" },
    { value: "optionC", label: "Option C" },
    { value: "optionD", label: "Option D" },
    { value: "optionE", label: "Option E" },
  ],
  dropdown4: [
    { value: "optionX", label: "Option X" },
    { value: "optionY", label: "Option Y" },
    { value: "optionZ", label: "Option Z" },
    { value: "optionW", label: "Option W" },
    { value: "optionV", label: "Option V" },
  ],
};

export default function Home() {
  // Initialize state with typed selected values
  const [selectedValues, setSelectedValues] = useState<SelectedValues>({
    dropdown1: "example",
    dropdown2: dropdownOptions.dropdown2[0].value,
    dropdown3: dropdownOptions.dropdown3[0].value,
    dropdown4: dropdownOptions.dropdown4[0].value,
  });

  // Handle selection change with proper typing
  const handleSelect = (dropdown: keyof DropdownOptions, value: string) => {
    setSelectedValues((prev) => ({ ...prev, [dropdown]: value }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center justify-between p-4">
        <div className="text-xl font-bold mr-4">FinTech</div>
        <div className="w-full justify-between items-center flex flex-row">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Home</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New Tab</MenubarItem>
              <MenubarItem>New Window</MenubarItem>
              <MenubarItem>Share</MenubarItem>
              <MenubarItem>Print</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>About</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Undo</MenubarItem>
              <MenubarItem>Redo</MenubarItem>
              <MenubarItem>Cut</MenubarItem>
              <MenubarItem>Paste</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Services</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Documentation</MenubarItem>
              <MenubarItem>Community</MenubarItem>
              <MenubarItem>About</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <Translate/>
        </div>
      </div>

      <div className="flex-grow flex flex-col items-center p-4 space-y-4">
        <div className="flex space-x-4">
          <Input placeholder="Invested Amount" className="w-64" />
          <Input placeholder="Time" className="w-64" />
        </div>
        
        {/* Container for dropdowns */}
        <div className="flex flex-col items-center space-y-4">
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className="flex items-center space-x-4 w-full max-w-4xl"
            >
              <label className="w-32 text-right">{dropdownLabels[num - 1]}</label>
              <div className="flex-grow flex items-center space-x-2 pr-5">
                <select
                  value={selectedValues[`dropdown${num}` as keyof SelectedValues]}
                  onChange={(e) => handleSelect(`dropdown${num}` as keyof DropdownOptions, e.target.value)}
                  className="p-2 border rounded"
                >
                  {dropdownOptions[`dropdown${num}` as keyof DropdownOptions].map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                
              </div>
              <div className="ml-4 text-gray-700">test</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
