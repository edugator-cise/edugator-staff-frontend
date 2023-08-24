import React, { useRef } from "react";

import { useEffect, useState } from "react";
import Image from "next/image";
import SuperEllipse, { Preset } from "react-superellipse";
import * as Popover from "@radix-ui/react-popover";
import {
  coverImageColors,
  coverImageData,
  placeholderAvatar,
} from "constants/coverImageData";
import { Course } from "hooks/course/useGetCourse";

const CoverImage = ({
  courseData,
  colorLoading,
  colorError,
  primaryColor,
}: {
  courseData: Course | undefined;
  colorLoading: boolean;
  colorError: Error | undefined;
  primaryColor: string | undefined; // hex code
}) => {
  useEffect(() => {
    setCoverImageColor(primaryColor || "transparent");
    setCoverImageType("color");
    setCoverImage("");
  }, [primaryColor]);

  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [coverImageColor, setCoverImageColor] = useState<string | null>(null); //store color of cover image if cover image is color
  const [coverImageType, setCoverImageType] = useState<"color" | "image">(
    "color"
  );

  const [positioningImage, setPositioningImage] = useState<boolean>(false); //store whether user is positioning image
  const [coverImagePosition, setCoverImagePosition] = useState<number>(50); //store percentage of cover image y position
  const [editedCoverImagePosition, setEditedCoverImagePosition] =
    useState<number>(50); //store percentage of cover image y position on change
  const [startImagePosition, setStartImagePosition] = useState<number>(50);

  const [coverImageSelectOpen, setCoverImageSelectOpen] = useState(false);

  // RESIZING COVER IMAGE LOGIC
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [mouseStart, setMouseStart] = useState<number | null>(null);

  // Called when the user starts dragging
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (positioningImage && imageContainerRef.current) {
      setMouseStart(e.clientY);

      // Convert initial image position from percentage to pixels
      const containerHeight = imageContainerRef.current.offsetHeight;
      const startImagePositionPixels =
        (editedCoverImagePosition / 100) * containerHeight;
      setStartImagePosition(startImagePositionPixels);
    }
  };

  // Called when the user is dragging
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    if (positioningImage && mouseStart && imageContainerRef.current) {
      const containerHeight = imageContainerRef.current.offsetHeight;
      const dragDelta = e.clientY - mouseStart;
      let newPosition = startImagePosition - dragDelta;
      newPosition = Math.max(0, Math.min(containerHeight, newPosition)); // restrict between 0 to containerHeight

      // Convert new position from pixels to percentage
      const newPositionPercentage = (newPosition / containerHeight) * 100;
      setEditedCoverImagePosition(newPositionPercentage);
    }
  };

  // Called when the user stops dragging
  const handleMouseUp = () => {
    if (positioningImage) {
      setMouseStart(null);
    }
  };

  const onChangeCoverImage = (
    coverImageType: "color" | "image",
    coverImage: string,
    coverImageColor: string
  ) => {
    setCoverImageType(coverImageType);
    setCoverImage(coverImage);
    setCoverImageColor(coverImageColor);
    setPositioningImage(false);
    setCoverImagePosition(50);
    setEditedCoverImagePosition(50);
  };

  return (
    <div
      ref={imageContainerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      /* onMouseLeave={() => {
              if (coverImageSelectOpen) setCoverImageSelectOpen(false);
            }} */
      className={`w-full h-[25vh] relative group select-none ${
        positioningImage ? "cursor-move" : "cursor-default"
      }`}
    >
      <div className="absolute -bottom-7 z-10 left-8 focus:ring-2 outline-none transition">
        <SuperEllipse
          p1={7}
          p2={30}
          className="min-w-[80px] min-h-[80px] bg-white dark:bg-nav-darkest flex items-center justify-center drop-shadow-2xl"
        >
          <SuperEllipse p1={5} p2={32} className="min-w-[76px] min-h-[76px]">
            <Image
              layout="fill"
              objectFit="cover"
              src={courseData?.logo || placeholderAvatar}
              alt="User profile picture"
              className="rounded-xl"
            />
            {/* children */}
          </SuperEllipse>
        </SuperEllipse>
      </div>
      {/* Select/Resize Cover Image Controls */}
      <div
        className={`absolute z-20 bottom-4 right-4 opacity-0 group-hover:opacity-100 rounded-md transition border border-gray-300 shadow-md bg-gray-100 flex ${
          coverImageSelectOpen ? "!opacity-100" : ""
        }`}
      >
        {positioningImage ? (
          <>
            <button
              onClick={() => {
                setPositioningImage(false);
                setCoverImagePosition(editedCoverImagePosition);
                // store this in course data officially
              }}
              className="py-1 px-2 text-xs font-medium text-gray-500 hover:bg-gray-200 rounded-l-md"
            >
              Save
            </button>
            <div className="w-px h-[99%] bg-gray-300"></div>
            <button
              onClick={() => {
                // if user is cancelling positioning, set the edited position to the original position
                setPositioningImage(false);
                setEditedCoverImagePosition(coverImagePosition);
              }}
              className="py-1 px-2 text-xs font-medium text-gray-500 hover:bg-gray-200 rounded-r-md"
            >
              {positioningImage ? "Cancel" : "Reposition Cover"}
            </button>
          </>
        ) : (
          <>
            <Popover.Root
              open={coverImageSelectOpen}
              onOpenChange={setCoverImageSelectOpen}
            >
              <Popover.Trigger autoFocus={false} asChild>
                <button className="py-1 px-2 text-xs font-medium text-gray-500 hover:bg-gray-200 rounded-l-md">
                  Change Cover
                </button>
              </Popover.Trigger>
              <Popover.Content
                hideWhenDetached
                align="center"
                side="bottom"
                sideOffset={8}
                collisionPadding={16}
                className="PopoverContent outline-none z-50 border bg-white w-full min-w-[400px] max-h-[500px] overflow-auto rounded-lg shadow-md flex flex-col"
              >
                <>
                  <div className="px-3 py-2 border-b bg-gray-100">
                    <p className="text-xs font-medium text-gray-500">Colors</p>
                  </div>
                  <div className="flex flex-wrap p-2">
                    <div className="w-1/3 p-2">
                      <input
                        type="radio"
                        name="coverImage"
                        id={primaryColor}
                        value={primaryColor}
                        checked={coverImage === primaryColor}
                        onChange={() => {
                          onChangeCoverImage(
                            "color",
                            "",
                            primaryColor || "transparent"
                          );
                        }}
                        className="hidden peer"
                      />
                      <label
                        htmlFor={primaryColor}
                        className="w-full cursor-pointer peer-checked:ring-2 peer-checked:ring-blue-500 block h-14 rounded-md relative overflow-hidden outline-none focus:ring-2 ring-offset-2 ring-offset-white ring-slate-400/70 shadow-inner"
                      >
                        <div
                          style={{
                            backgroundColor:
                              colorLoading || colorError
                                ? "#000"
                                : primaryColor,
                          }}
                          className="rounded-md transition w-full h-full"
                        />
                      </label>
                    </div>
                    {coverImageColors.map((color, index) => (
                      <div key={color} className="w-1/3 p-2">
                        <input
                          type="radio"
                          name="coverImage"
                          id={color}
                          value={color}
                          checked={coverImage === color}
                          onChange={() => {
                            onChangeCoverImage("color", "", color);
                          }}
                          className="hidden peer"
                        />
                        <label
                          htmlFor={color}
                          className="w-full cursor-pointer peer-checked:ring-2 peer-checked:ring-blue-500 block h-14 rounded-md relative overflow-hidden outline-none focus:ring-2 ring-offset-2 ring-offset-white ring-slate-400/70 shadow-inner"
                        >
                          <div
                            style={{
                              backgroundColor: color,
                            }}
                            className="rounded-md transition w-full h-full"
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                </>

                {coverImageData.map((image, index) => (
                  <>
                    <div className="px-3 py-2 border-b bg-gray-100">
                      <p className="text-xs font-medium text-gray-500">
                        {image.title}
                      </p>
                    </div>
                    <div className="flex flex-wrap p-2">
                      {image.images.map((image, index) => (
                        <div key={index} className="w-1/3 p-2">
                          <input
                            type="radio"
                            name="coverImage"
                            id={image}
                            value={image}
                            checked={coverImage === image}
                            onChange={() => {
                              onChangeCoverImage("image", image, "transparent");
                            }}
                            className="hidden peer"
                          />
                          <label
                            htmlFor={image}
                            autoFocus={false}
                            className="block cursor-pointer peer-checked:ring-2 peer-checked:ring-blue-500 w-full hover:ring-2 transition h-14 rounded-md relative overflow-hidden outline-none focus:ring-2 ring-offset-2 ring-offset-white ring-slate-400/70 shadow-inner"
                          >
                            <Image
                              src={`/images/covers/previews/${image}`}
                              layout="fill"
                              objectFit="cover"
                              className="rounded-md"
                            />
                          </label>
                        </div>
                      ))}
                    </div>
                  </>
                ))}
                <div className="flex flex-col space-y-2"></div>
              </Popover.Content>
            </Popover.Root>

            <div className="w-px h-[99%] bg-gray-300"></div>
            <button
              onClick={() => {
                // if user is activating positioning, set the original position to the edited position
                setPositioningImage(true);
                setCoverImagePosition(editedCoverImagePosition);
              }}
              className="py-1 px-2 text-xs font-medium text-gray-500 hover:bg-gray-200 rounded-r-md"
            >
              Reposition Cover
            </button>
          </>
        )}
      </div>

      {/* Drag to Resize Indicator */}
      {positioningImage && (
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 opacity-50">
          <div className="py-1 text-white px-2 bg-white/40 rounded-md">
            <p className="text-xs font-medium select-none">Drag to resize</p>
          </div>
        </div>
      )}

      {/* Background Cover Image */}
      <Image
        src={coverImage ? `/images/covers/${coverImage}` : ""}
        style={{
          backgroundColor: coverImageColor || "#ECECEE",
        }}
        className="transition"
        layout="fill"
        objectFit="cover"
        objectPosition={`center ${
          positioningImage
            ? `${editedCoverImagePosition}%`
            : `${coverImagePosition}%`
        }`}
      />
    </div>
  );
};

export default CoverImage;
